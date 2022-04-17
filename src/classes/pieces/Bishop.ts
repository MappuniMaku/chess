import { Piece, PieceProps } from "../Piece";
import {
  getDiagonalsCellsIdsFromPosition,
  setPieceElementProperties,
} from "../../helpers";
import { PieceType } from "../../types";

export class Bishop extends Piece {
  constructor(props: PieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Bishop, this.color);
  }

  getMoves(): number[] {
    return getDiagonalsCellsIdsFromPosition(this.position);
  }
}
