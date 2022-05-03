import { Piece } from "../Piece";
import { PieceType, IPieceProps } from "../../types";
import {
  cutLineIfNecessary,
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

export class Queen extends Piece {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Queen, this.color);
  }

  getMoves(): number[] {
    return [
      getTopLine(this.position),
      getRightLine(this.position),
      getBottomLine(this.position),
      getLeftLine(this.position),
      getTopLeftDiagonal(this.position),
      getTopRightDiagonal(this.position),
      getBottomRightDiagonal(this.position),
      getBottomLeftDiagonal(this.position),
    ]
      .map((line) => cutLineIfNecessary({ line, selectedPiece: this }))
      .flat();
  }
}
