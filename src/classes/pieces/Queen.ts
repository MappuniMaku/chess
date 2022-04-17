import { Piece, PieceProps } from "../Piece";
import {
  getDiagonalsCellsIdsFromPosition,
  getLinesCellsIdsFromPosition,
  setPieceElementProperties,
} from "../../helpers";
import { PieceType } from "../../types";

export class Queen extends Piece {
  constructor(props: PieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Queen, this.color);
  }

  getMoves(): number[] {
    return [
      ...getLinesCellsIdsFromPosition(this.position),
      ...getDiagonalsCellsIdsFromPosition(this.position),
    ];
  }
}
