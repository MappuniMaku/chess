import { Piece, PieceProps } from "../Piece";
import { setPieceElementProperties } from "../../helpers";
import { PieceType } from "../../types";

export class Knight extends Piece {
  constructor(props: PieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Knight, this.color);
  }
}
