import { PieceColor, PieceType } from "./enums";

export interface IPiecePosition {
  row: number;
  col: number;
}

export interface IPieceProps {
  position: IPiecePosition;
  cellId: number;
  color: PieceColor;
  id: number;
  type: PieceType;
  pieces: IPieceProps[];
}

export interface ICutLinesIfNecessaryFunctionProps {
  lines: number[][];
  selectedPiece: IPieceProps;
}

export type ICutLinesIfNecessaryFunction = ({
  lines,
  selectedPiece,
}: ICutLinesIfNecessaryFunctionProps) => number[];

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

export interface IGetProtectedPiecesCellsFromLinesFunctionProps {
  lines: number[][];
  selectedPiece: IPieceProps;
}

export type IGetProtectedPiecesCellsFromLinesFunction = ({
  lines,
  selectedPiece,
}: IGetProtectedPiecesCellsFromLinesFunctionProps) => number[];

export interface IGetProtectedPiecesCellsFromIdsFunctionProps {
  ids: number[];
  selectedPiece: IPieceProps;
}

export type IGetProtectedPiecesCellsFromIdsFunction = ({
  ids,
  selectedPiece,
}: IGetProtectedPiecesCellsFromIdsFunctionProps) => number[];
