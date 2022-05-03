import { Piece } from "../Piece";
import { PieceType, IPieceProps } from "../../types";
import {
  cutLineIfNecessary,
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

  getMoves(): number[] {
    return [
      getTopLine(this.position),
      getRightLine(this.position),
      getBottomLine(this.position),
      getLeftLine(this.position),
    ]
      .map((line) => cutLineIfNecessary({ line, selectedPiece: this }))
      .flat();
  }
}
