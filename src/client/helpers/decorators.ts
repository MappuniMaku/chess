import { PieceColor, PieceType } from '../enums';

export const setPieceElementProperties = (
  $el: HTMLImageElement,
  pieceName: PieceType,
  color: PieceColor,
): void => {
  $el.src = `/images/pieces/${pieceName}-${color}.png`;
  $el.alt = `${color} ${pieceName}`;
};
