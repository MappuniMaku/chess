import { Piece, PieceProps } from "../Piece";
import {
  getCellIdFromPosition,
  setPieceElementProperties,
} from "../../helpers";
import { PieceColor, PieceType } from "../../types";

export class Pawn extends Piece {
  constructor(props: PieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Pawn, this.color);
  }

  getMoves(): number[] {
    const { row, col } = this.position;
    switch (this.color) {
      case PieceColor.Black:
        if (row === 2) {
          return [
            getCellIdFromPosition({ row: 3, col }),
            getCellIdFromPosition({ row: 4, col }),
          ];
        }
        return [getCellIdFromPosition({ row: row + 1, col })];
      case PieceColor.White:
        if (row === 7) {
          return [
            getCellIdFromPosition({ row: 6, col }),
            getCellIdFromPosition({ row: 5, col }),
          ];
        }
        return [getCellIdFromPosition({ row: row - 1, col })];
    }
  }
}
