import { CastlingType, PieceColor, PieceType } from "enums";
import { IUser } from "types";

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
  getPossibleUnPassantMove: () => number | undefined;
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
  movesLog: IMove[];
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
  movesLog: IMove[];
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
  piece: Pick<IPiece, "id" | "type" | "color" | "hasMadeAnyMoves">;
  initialPosition: IPiecePosition;
  finalPosition: IPiecePosition;
  wasCaptureMade?: boolean;
  castlingType?: CastlingType;
  selectedPieceTypeToTransform?: PieceType;
  wasCheckMade?: boolean;
  isMate?: boolean;
  isStalemate?: boolean;
}

export interface IPlayer {
  user: IUser;
  isGameAccepted: boolean;
}

export interface IGame {
  id: string;
  black: IPlayer;
  white: IPlayer;
  movesLog: IMove[];
  isStarted: boolean;
}
