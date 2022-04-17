import { PiecePosition } from "../types";

export const calculatePositionStyles = (
  position: PiecePosition
): {
  left: string;
  top: string;
} => ({
  left: `${((position.col - 1) * 100) / 8}%`,
  top: `${((position.row - 1) * 100) / 8}%`,
});
