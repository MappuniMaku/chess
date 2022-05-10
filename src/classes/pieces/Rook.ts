import { Piece } from "../Piece";
import { IPieceProps } from "../../types";
import { PieceType } from "../../enums";
import {
  getBottomLine,
  getLeftLine,
  getRightLine,
  getTopLine,
  setPieceElementProperties,
} from "../../helpers";

export class Rook extends Piece {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Rook, this.color);
  }

  getLines(): number[][] {
    return [
      getTopLine(this.position),
      getRightLine(this.position),
      getBottomLine(this.position),
      getLeftLine(this.position),
    ];
  }
}
