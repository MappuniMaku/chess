import { Piece } from "../Piece";
import { IPieceProps, PieceType } from "../../types";
import {
  cutLineIfNecessary,
  getTopLeftDiagonal,
  getTopRightDiagonal,
  getBottomRightDiagonal,
  getBottomLeftDiagonal,
  setPieceElementProperties,
} from "../../helpers";

export class Bishop extends Piece {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Bishop, this.color);
  }

  getMoves(): number[] {
    return [
      getTopLeftDiagonal(this.position),
      getTopRightDiagonal(this.position),
      getBottomRightDiagonal(this.position),
      getBottomLeftDiagonal(this.position),
    ]
      .map((line) => cutLineIfNecessary({ line, selectedPiece: this }))
      .flat();
  }
}
