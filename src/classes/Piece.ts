import { IPiecePosition, IPieceProps } from "../types";
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
  getCellIdFromPosition,
  getProtectedPiecesCellsFromIds,
  getProtectedPiecesCellsFromLines,
  removeCellsIfNecessary,
} from "../helpers";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./pieces";

export class Piece implements IPieceProps {
  readonly id: number;
  readonly type: PieceType;
  position: IPiecePosition;
  cellId: number;
  readonly pieces: IPieceProps[];
  readonly color: PieceColor;
  readonly $el: HTMLImageElement;

  constructor(props: IPieceProps) {
    const { id, position, color, pieces, cellId, type } = props;
    this.id = id;
    this.position = position;
    this.cellId = cellId;
    this.color = color;
    this.pieces = pieces;
    this.type = type;
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

  setPosition(position: IPiecePosition): void {
    this.position = position;
    this.cellId = getCellIdFromPosition(position);
    const { left, top } = calculatePositionStyles(position);
    this.$el.style.left = left;
    this.$el.style.top = top;
  }

  getProtectedPiecesCells(): number[] {
    if (lineMovingPieces.includes(this.type as ILineMovingPiece)) {
      const lines = (this as unknown as Bishop | Queen | Rook).getLines();
      return getProtectedPiecesCellsFromLines({ lines, selectedPiece: this });
    }
    if (cellMovingPieces.includes(this.type as ICellMovingPiece)) {
      const ids = (this as unknown as King | Knight).getIds();
      return getProtectedPiecesCellsFromIds({ ids, selectedPiece: this });
    }
    throw new Error(
      "Pawn has getPossibleHits() method that is used to get protected pieces cells"
    );
  }

  getMoves(): number[] {
    if (lineMovingPieces.includes(this.type as ILineMovingPiece)) {
      const lines = (this as unknown as Bishop | Queen | Rook).getLines();
      return cutLinesIfNecessary({ lines, selectedPiece: this });
    }
    if (cellMovingPieces.includes(this.type as ICellMovingPiece)) {
      const ids = (this as unknown as King | Knight).getIds();
      return removeCellsIfNecessary({ ids, selectedPiece: this });
    }
    return (this as unknown as Pawn).getMoves();
  }
}
