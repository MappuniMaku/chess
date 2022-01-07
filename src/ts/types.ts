export enum Color {
  Light = "light",
  Dark = "dark",
}

export enum PieceColor {
  White = "white",
  Black = "black",
}

export type PiecePosition = {
  row: number;
  col: number;
};

export enum PieceType {
  Pawn = "pawn",
  Bishop = "bishop",
  Knight = "knight",
  Rook = "rook",
  King = "king",
  Queen = "queen",
}
