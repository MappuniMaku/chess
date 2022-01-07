import { Piece, PieceProps } from "../Piece";
import { setPieceElementProperties } from "../../helpers";
import { PieceType } from "../../types";

export class Pawn extends Piece {
  constructor(props: PieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Pawn, this.color);
  }
}
