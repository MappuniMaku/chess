export enum Color {
  Light = "light",
  Dark = "dark",
}

export enum PieceColor {
  White = "white",
  Black = "black",
}

export interface IPiecePosition {
  row: number;
  col: number;
}

export enum PieceType {
  Pawn = "pawn",
  Bishop = "bishop",
  Knight = "knight",
  Rook = "rook",
  King = "king",
  Queen = "queen",
}

export interface IPieceProps {
  position: IPiecePosition;
  cellId: number;
  color: PieceColor;
  id: number;
  type: PieceType;
  pieces: IPieceProps[];
}

export interface ICutLineIfNecessaryFunctionProps {
  line: number[];
  selectedPiece: IPieceProps;
}

export type ICutLineIfNecessaryFunction = ({
  line,
  selectedPiece,
}: ICutLineIfNecessaryFunctionProps) => number[];

export interface IRemoveCellsIfNecessaryFunctionProps {
  ids: number[];
  selectedPiece: IPieceProps;
}

export type IRemoveCellsIfNecessaryFunction = ({
  ids,
  selectedPiece,
}: IRemoveCellsIfNecessaryFunctionProps) => number[];

export interface IKingBounder {
  boundingEnemyPiece: IPieceProps;
  boundPiece: IPieceProps;
  boundingLine: number[];
}

export interface IKingChecker {
  piece: IPieceProps;
  checkingLine: number[];
}
