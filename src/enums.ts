export enum Color {
  Light = "light",
  Dark = "dark",
}

export enum PieceColor {
  White = "white",
  Black = "black",
}

export enum PieceType {
  Pawn = "pawn",
  Bishop = "bishop",
  Knight = "knight",
  Rook = "rook",
  King = "king",
  Queen = "queen",
}

export const lineMovingPieces = [
  PieceType.Bishop,
  PieceType.Queen,
  PieceType.Rook,
] as const;

export type ILineMovingPiece = typeof lineMovingPieces[number];

export const cellMovingPieces = [PieceType.Knight, PieceType.King] as const;

export type ICellMovingPiece = typeof cellMovingPieces[number];
