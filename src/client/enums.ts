export enum Color {
  Light = 'light',
  Dark = 'dark',
}

export enum PieceColor {
  White = 'white',
  Black = 'black',
}

export enum PieceType {
  Pawn = 'pawn',
  Bishop = 'bishop',
  Knight = 'knight',
  Rook = 'rook',
  King = 'king',
  Queen = 'queen',
}

export const lineMovingPieces = [
  PieceType.Bishop,
  PieceType.Queen,
  PieceType.Rook,
] as const;

export type ILineMovingPiece = typeof lineMovingPieces[number];

export const cellMovingPieces = [PieceType.Knight, PieceType.King] as const;

export type ICellMovingPiece = typeof cellMovingPieces[number];

export enum CastlingType {
  Short = 'short',
  Long = 'long',
}

export const SHORT_PIECES_NAMES_DICTIONARY: Record<PieceType, string> = {
  pawn: '',
  bishop: 'B',
  knight: 'N',
  rook: 'R',
  king: 'K',
  queen: 'Q',
};

export const COLUMN_NAMES = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h',
};
