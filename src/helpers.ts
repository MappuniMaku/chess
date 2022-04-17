import { PieceColor, PiecePosition, PieceType } from "./types";

export const setPieceElementProperties = (
  $el: HTMLImageElement,
  pieceName: PieceType,
  color: PieceColor
): void => {
  $el.src = `/src/images/pieces/${pieceName}-${color}.png`;
  $el.alt = `${color} ${pieceName}`;
};

export const calculatePositionStyles = (
  position: PiecePosition
): {
  left: string;
  top: string;
} => ({
  left: `${((position.col - 1) * 100) / 8}%`,
  top: `${((position.row - 1) * 100) / 8}%`,
});
