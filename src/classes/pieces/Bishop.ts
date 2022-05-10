import { Piece } from "../Piece";
import { IPieceProps } from "../../types";
import { PieceType } from "../../enums";
import {
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

  getLines(): number[][] {
    return [
      getTopLeftDiagonal(this.position),
      getTopRightDiagonal(this.position),
      getBottomRightDiagonal(this.position),
      getBottomLeftDiagonal(this.position),
    ];
  }
}
