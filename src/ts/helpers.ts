import { PieceColor, PieceType } from "./types";

export const setPieceElementProperties = (
  $el: HTMLImageElement,
  pieceName: PieceType,
  color: PieceColor
): void => {
  $el.src = `images/pieces/${pieceName}-${color}.png`;
  $el.alt = `${color} ${pieceName}`;
};
