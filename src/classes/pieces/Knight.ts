import { Piece, PieceProps } from "../Piece";
import {
  getCellIdFromPosition,
  setPieceElementProperties,
} from "../../helpers";
import { PiecePosition, PieceType } from "../../types";

export class Knight extends Piece {
  constructor(props: PieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Knight, this.color);
  }

  getMoves(): number[] {
    const { row, col } = this.position;
    const positions: PiecePosition[] = [];
    positions.push({ row: row + 1, col: col - 2 });
    positions.push({ row: row + 2, col: col - 1 });
    positions.push({ row: row + 2, col: col + 1 });
    positions.push({ row: row + 1, col: col + 2 });
    positions.push({ row: row - 1, col: col + 2 });
    positions.push({ row: row - 2, col: col + 1 });
    positions.push({ row: row - 2, col: col - 1 });
    positions.push({ row: row - 1, col: col - 2 });
    return positions
      .filter(
        (item) =>
          item.row >= 1 && item.row <= 8 && item.col >= 1 && item.col <= 8
      )
      .map(getCellIdFromPosition);
  }
}
