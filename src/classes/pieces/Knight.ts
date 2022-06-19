import { Piece } from "../Piece";
import { IKnight, IPiecePosition, IPieceProps } from "../../types";
import { PieceType } from "../../enums";
import {
  getCellIdFromPosition,
  removeInvalidPositions,
  setPieceElementProperties,
} from "../../helpers";

export class Knight extends Piece implements IKnight {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Knight, this.color);
  }

  getIds() {
    const { row, col } = this.position;
    const positions: IPiecePosition[] = [];
    positions.push({ row: row + 1, col: col - 2 });
    positions.push({ row: row + 2, col: col - 1 });
    positions.push({ row: row + 2, col: col + 1 });
    positions.push({ row: row + 1, col: col + 2 });
    positions.push({ row: row - 1, col: col + 2 });
    positions.push({ row: row - 2, col: col + 1 });
    positions.push({ row: row - 2, col: col - 1 });
    positions.push({ row: row - 1, col: col - 2 });
    return removeInvalidPositions(positions).map(getCellIdFromPosition);
  }
}
