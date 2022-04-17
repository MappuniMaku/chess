import { Piece, PieceProps } from "../Piece";
import {
  getLinesCellsIdsFromPosition,
  setPieceElementProperties,
} from "../../helpers";
import { PieceType } from "../../types";

export class Rook extends Piece {
  constructor(props: PieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Rook, this.color);
  }

  getMoves(): number[] {
    return getLinesCellsIdsFromPosition(this.position);
  }
}
