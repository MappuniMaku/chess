import {
  IBishop,
  IBoundingLine,
  IKing,
  IKingBounder,
  IKnight,
  IPawn,
  IPiece,
  IPiecePosition,
  IPieceProps,
  IQueen,
  IRook,
} from "../types";
import {
  cellMovingPieces,
  ICellMovingPiece,
  ILineMovingPiece,
  lineMovingPieces,
  PieceColor,
  PieceType,
} from "../enums";
import {
  calculatePositionStyles,
  cutLinesIfNecessary,
  getBottomLeftDiagonal,
  getBottomLine,
  getBottomRightDiagonal,
  getCellIdFromPosition,
  getLeftLine,
  getProtectedPiecesCellsFromIds,
  getProtectedPiecesCellsFromLines,
  getRightLine,
  getTopLeftDiagonal,
  getTopLine,
  getTopRightDiagonal,
  removeCellsIfNecessary,
} from "../helpers";

export class Piece implements IPiece {
  readonly id: number;
  readonly type: PieceType;
  position: IPiecePosition;
  cellId: number;
  hasMadeAnyMoves: boolean;
  readonly pieces: IPiece[];
  readonly color: PieceColor;
  readonly $el: HTMLImageElement;

  constructor(props: IPieceProps) {
    const { id, position, color, pieces, cellId, type, hasMadeAnyMoves } =
      props;
    this.id = id;
    this.position = position;
    this.cellId = cellId;
    this.color = color;
    this.pieces = pieces;
    this.type = type;
    this.hasMadeAnyMoves = hasMadeAnyMoves;
    this.$el = this.getElement();
    this.setPosition(position);
  }

  private getElement(): HTMLImageElement {
    const el = document.createElement("img");
    el.dataset.pieceId = String(this.id);
    el.draggable = false;
    el.classList.add("Chess__piece");
    return el;
  }

  setPosition(position: IPiecePosition) {
    this.position = position;
    this.cellId = getCellIdFromPosition(position);
    const { left, top } = calculatePositionStyles(position);
    this.$el.style.left = left;
    this.$el.style.top = top;
  }

  getProtectedPiecesCells(): number[] {
    if (lineMovingPieces.includes(this.type as ILineMovingPiece)) {
      const lines = (this as unknown as IBishop | IQueen | IRook).getLines();
      return getProtectedPiecesCellsFromLines({ lines, selectedPiece: this });
    }
    if (cellMovingPieces.includes(this.type as ICellMovingPiece)) {
      const ids = (this as unknown as IKing | IKnight).getIds();
      return getProtectedPiecesCellsFromIds({ ids, selectedPiece: this });
    }
    throw new Error(
      "getProtectedPiecesCells(): Pawn has getPossibleHits() method that is used to get protected pieces cells"
    );
  }

  getMoves(): number[] {
    if (lineMovingPieces.includes(this.type as ILineMovingPiece)) {
      const lines = (this as unknown as IBishop | IQueen | IRook).getLines();
      return cutLinesIfNecessary({ lines, selectedPiece: this });
    }
    if (cellMovingPieces.includes(this.type as ICellMovingPiece)) {
      const ids = (this as unknown as IKing | IKnight).getIds();
      return removeCellsIfNecessary({ ids, selectedPiece: this });
    }
    return (this as unknown as IPawn).getMoves();
  }

  getKingInfo() {
    const activePieceColor = this.color;
    const king = this.pieces.find(
      (p) => p.type === PieceType.King && p.color === activePieceColor
    ) as IKing | undefined;
    if (king === undefined) {
      throw new Error("getKingInfo(): King not found");
    }
    const { position: kingPosition } = king;
    const kingLines = [
      getTopLine(kingPosition),
      getRightLine(kingPosition),
      getBottomLine(kingPosition),
      getLeftLine(kingPosition),
    ];
    const kingDiagonals = [
      getTopLeftDiagonal(kingPosition),
      getTopRightDiagonal(kingPosition),
      getBottomRightDiagonal(kingPosition),
      getBottomLeftDiagonal(kingPosition),
    ];
    return {
      king,
      kingLines,
      kingDiagonals,
    };
  }

  getKingCheckers() {
    const activePieceColor = this.color;

    const { king, kingLines, kingDiagonals } = this.getKingInfo();
    const lingLinesAndDiagonals = [...kingLines, ...kingDiagonals];
    const { cellId: kingCellId } = king;

    const enemyPieces = this.pieces.filter((p) => p.color !== activePieceColor);
    const checkers = enemyPieces.filter((p) =>
      p.getMoves().includes(kingCellId)
    );
    const possibleLineCheckers = [
      PieceType.Bishop,
      PieceType.Rook,
      PieceType.Queen,
    ];
    return checkers.map((piece) => {
      const { type, cellId } = piece;
      if (possibleLineCheckers.includes(type)) {
        const attackingLine = lingLinesAndDiagonals.find((line) =>
          line.includes(cellId)
        );
        const attackerCellIndex = attackingLine?.findIndex(
          (id) => id === cellId
        );
        if (attackingLine === undefined || attackerCellIndex === undefined) {
          throw new Error(
            "getKingCheckers(): Cannot find checker on checking line"
          );
        }
        return {
          piece,
          checkingLine: attackingLine.slice(0, attackerCellIndex + 1),
        };
      }
      return {
        piece,
        checkingLine: [cellId],
      };
    });
  }

  getKingBounders() {
    const activePieceColor = this.color;
    const { kingLines, kingDiagonals } = this.getKingInfo();
    const possibleLineBounders = [PieceType.Rook, PieceType.Queen];
    const possibleDiagonalBounders = [PieceType.Bishop, PieceType.Queen];

    const getBoundingPiecesLines = (
      lines: number[][],
      possibleBounders: PieceType[]
    ): IBoundingLine[] => {
      return lines
        .map((line) => ({
          line,
          pieces: line.map((cellId, index) => ({
            piece: this.pieces.find((p) => p.cellId === cellId),
            index,
          })),
        }))
        .filter((l) =>
          l.pieces.some(
            (p) =>
              p.piece !== undefined &&
              possibleBounders.includes(p.piece.type) &&
              p.piece.color !== activePieceColor
          )
        )
        .filter((l) => {
          const { pieces } = l;
          const firstFriendlyPiece = pieces.find(
            (p) => p.piece?.color === activePieceColor
          );
          const boundingPiece = pieces.find(
            (p) =>
              p.piece !== undefined &&
              possibleBounders.includes(p.piece.type) &&
              p.piece.color !== activePieceColor
          );
          return (
            firstFriendlyPiece !== undefined &&
            boundingPiece !== undefined &&
            !pieces.some(
              (p) =>
                p.piece !== undefined &&
                p.index > firstFriendlyPiece.index &&
                p.index < boundingPiece.index
            )
          );
        });
    };

    const boundingPiecesLines = getBoundingPiecesLines(
      kingLines,
      possibleLineBounders
    );
    const boundingPiecesDiagonals = getBoundingPiecesLines(
      kingDiagonals,
      possibleDiagonalBounders
    );

    const getBounders = (
      boundingLines: IBoundingLine[],
      bounders: PieceType[]
    ): IKingBounder[] =>
      boundingLines.map((l) => {
        const { pieces, line } = l;
        const firstFriendlyPiece = pieces.find(
          (p) => p.piece?.color === activePieceColor
        );
        const boundingPiece = pieces.find(
          (p) =>
            p.piece !== undefined &&
            bounders.includes(p.piece.type) &&
            p.piece.color !== activePieceColor
        );
        if (
          firstFriendlyPiece?.piece === undefined ||
          boundingPiece?.piece === undefined
        ) {
          throw new Error("getKingBounders(): Failed to form a bounding line");
        }
        return {
          boundingEnemyPiece: boundingPiece.piece,
          boundPiece: firstFriendlyPiece.piece,
          boundingLine: line.filter(
            (_, i) => i > firstFriendlyPiece.index && i <= boundingPiece.index
          ),
        };
      });

    return [
      ...getBounders(boundingPiecesLines, possibleLineBounders),
      ...getBounders(boundingPiecesDiagonals, possibleDiagonalBounders),
    ];
  }

  getValidMoves() {
    const boundingLineObj = this.getKingBounders().find(
      (l) => l.boundPiece.id === this.id
    );
    const targetCellsIds = this.getMoves();
    let possibleMoves =
      boundingLineObj !== undefined
        ? targetCellsIds.filter((cellId) =>
            boundingLineObj.boundingLine.includes(cellId)
          )
        : targetCellsIds;
    if (this.type === PieceType.King) {
      const { king } = this.getKingInfo();
      const enemyPieces = this.pieces.filter((p) => p.color !== this.color);
      const attackedCells = this.getAttackedCells(enemyPieces);
      possibleMoves = possibleMoves.filter((id) => !attackedCells.includes(id));
      possibleMoves.push(...king.getPossibleCastles());
    }

    const kingCheckers = this.getKingCheckers();
    switch (kingCheckers.length) {
      case 1: {
        if (this.type === PieceType.King) {
          return possibleMoves;
        }
        const [checker] = kingCheckers;
        return possibleMoves.filter((id) => checker.checkingLine.includes(id));
      }
      case 2: {
        return this.type === PieceType.King ? possibleMoves : [];
      }
      default: {
        return possibleMoves;
      }
    }
  }

  getAttackedCells(pieces: IPiece[]): number[] {
    const result: number[] = [];
    pieces.forEach((p) => {
      const { type } = p;
      if (type !== PieceType.Pawn) {
        result.push(...p.getMoves(), ...p.getProtectedPiecesCells());
        return;
      }
      result.push(...(p as IPawn).getPossibleHits());
    });
    return [...new Set(result)];
  }

  getCastlingRook(targetCastlingCell: number) {
    const rooksCellIdsDictionary = {
      2: {
        rookCell: 0,
        targetPosition: {
          row: 1,
          col: 4,
        },
      },
      6: {
        rookCell: 7,
        targetPosition: {
          row: 1,
          col: 6,
        },
      },
      58: {
        rookCell: 56,
        targetPosition: {
          row: 8,
          col: 4,
        },
      },
      62: {
        rookCell: 63,
        targetPosition: {
          row: 8,
          col: 6,
        },
      },
    };
    const { rookCell, targetPosition } =
      rooksCellIdsDictionary[targetCastlingCell as 2 | 6 | 58 | 62];
    const rook = this.pieces.find((p) => p.cellId === rookCell) as
      | IRook
      | undefined;
    if (rook === undefined) {
      throw new Error("getCastlingRook(): Castling rook not found");
    }
    return {
      rook,
      targetPosition,
    };
  }
}
