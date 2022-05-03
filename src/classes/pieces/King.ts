import { Piece } from "../Piece";
import { PieceType, IPieceProps } from "../../types";
import {
  getBottomLeftDiagonal,
  getBottomLine,
  getBottomRightDiagonal,
  getLeftLine,
  getRightLine,
  getTopLeftDiagonal,
  getTopLine,
  getTopRightDiagonal,
  removeCellsIfNecessary,
  setPieceElementProperties,
} from "../../helpers";

export class King extends Piece {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.King, this.color);
  }

  getMoves(): number[] {
    const ids = [
      getTopLine(this.position)[0] ?? [],
      getBottomLine(this.position)[0] ?? [],
      getLeftLine(this.position)[0] ?? [],
      getRightLine(this.position)[0] ?? [],
      getTopLeftDiagonal(this.position)[0] ?? [],
      getTopRightDiagonal(this.position)[0] ?? [],
      getBottomLeftDiagonal(this.position)[0] ?? [],
      getBottomRightDiagonal(this.position)[0] ?? [],
    ].flat();
    return removeCellsIfNecessary({ ids, selectedPiece: this });
  }
}
