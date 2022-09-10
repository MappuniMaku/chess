import {
  CastlingType,
  cellMovingPieces,
  lineMovingPieces,
  PieceColor,
  PieceType,
} from "enums";

export type ILineMovingPiece = typeof lineMovingPieces[number];

export type ICellMovingPiece = typeof cellMovingPieces[number];

export interface IPiecePosition {
  row: number;
  col: number;
}

export interface IBishop extends IPiece {
  getLines: () => number[][];
}

export interface IKing extends IPiece {
  getIds: () => number[];
  getPossibleCastles: () => number[];
}

export interface IKnight extends IPiece {
  getIds: () => number[];
}

export interface IPawn extends IPiece {
  getPossibleHits: () => number[];
  getMoves: () => number[];
}

export interface IQueen extends IPiece {
  getLines: () => number[][];
}

export interface IRook extends IPiece {
  getLines: () => number[][];
}

export interface IPiece {
  position: IPiecePosition;
  cellId: number;
  color: PieceColor;
  id: number;
  type: PieceType;
  hasMadeAnyMoves: boolean;
  pieces: IPiece[];
  setPosition: (position: IPiecePosition) => void;
  getProtectedPiecesCells: () => number[];
  getMoves: () => number[];
  getKingInfo: () => {
    king: IKing;
    kingLines: number[][];
    kingDiagonals: number[][];
  };
  getKingCheckers: () => IKingChecker[];
  getKingBounders: () => IKingBounder[];
  getValidMoves: () => number[];
  getAttackedCells: (pieces: IPiece[]) => number[];
  getCastlingRook: (targetCastlingCell: number) => {
    rook: IRook;
    targetPosition: IPiecePosition;
    castlingType: CastlingType;
  };
}

export interface IPieceProps {
  position: IPiecePosition;
  cellId: number;
  color: PieceColor;
  id: number;
  type: PieceType;
  hasMadeAnyMoves: boolean;
  pieces: IPiece[];
}

export interface ICutLinesIfNecessaryFunctionProps {
  lines: number[][];
  selectedPiece: IPiece;
}

export type ICutLinesIfNecessaryFunction = ({
  lines,
  selectedPiece,
}: ICutLinesIfNecessaryFunctionProps) => number[];

export interface IRemoveCellsIfNecessaryFunctionProps {
  ids: number[];
  selectedPiece: IPiece;
}

export type IRemoveCellsIfNecessaryFunction = ({
  ids,
  selectedPiece,
}: IRemoveCellsIfNecessaryFunctionProps) => number[];

export interface IKingBounder {
  boundingEnemyPiece: IPiece;
  boundPiece: IPiece;
  boundingLine: number[];
}

export interface IKingChecker {
  piece: IPiece;
  checkingLine: number[];
}

export interface IGetProtectedPiecesCellsFromLinesFunctionProps {
  lines: number[][];
  selectedPiece: IPiece;
}

export type IGetProtectedPiecesCellsFromLinesFunction = ({
  lines,
  selectedPiece,
}: IGetProtectedPiecesCellsFromLinesFunctionProps) => number[];

export interface IGetProtectedPiecesCellsFromIdsFunctionProps {
  ids: number[];
  selectedPiece: IPiece;
}

export type IGetProtectedPiecesCellsFromIdsFunction = ({
  ids,
  selectedPiece,
}: IGetProtectedPiecesCellsFromIdsFunctionProps) => number[];

export interface IBoundingLine {
  line: number[];
  pieces: { piece: IPiece | undefined; index: number }[];
}

export interface IMove {
  piece: IPiece;
  initialPosition: IPiecePosition;
  finalPosition: IPiecePosition;
  wasCaptureMade?: boolean;
  castlingType?: CastlingType;
  selectedPieceTypeToTransform?: PieceType;
  wasCheckMade?: boolean;
}
