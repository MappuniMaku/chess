import { Piece, PieceProps } from "../Piece";
import {
  getBottomLeftDiagonal,
  getBottomLine,
  getBottomRightDiagonal,
  getLeftLine,
  getRightLine,
  getTopLeftDiagonal,
  getTopLine,
  getTopRightDiagonal,
  setPieceElementProperties,
} from "../../helpers";
import { PieceType } from "../../types";

export class King extends Piece {
  constructor(props: PieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.King, this.color);
  }

  getMoves(): number[] {
    return [
      getTopLine(this.position)[0] ?? [],
      getBottomLine(this.position)[0] ?? [],
      getLeftLine(this.position)[0] ?? [],
      getRightLine(this.position)[0] ?? [],
      getTopLeftDiagonal(this.position)[0] ?? [],
      getTopRightDiagonal(this.position)[0] ?? [],
      getBottomLeftDiagonal(this.position)[0] ?? [],
      getBottomRightDiagonal(this.position)[0] ?? [],
    ].flat();
  }
}
