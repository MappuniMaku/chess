import { Piece } from "../Piece";
import { IPiecePosition, PieceType, IPieceProps } from "../../types";
import {
  getCellIdFromPosition,
  removeCellsIfNecessary,
  removeInvalidPositions,
  setPieceElementProperties,
} from "../../helpers";

export class Knight extends Piece {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Knight, this.color);
  }

  getMoves(): number[] {
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
    const ids = removeInvalidPositions(positions).map(getCellIdFromPosition);
    return removeCellsIfNecessary({ ids, selectedPiece: this });
  }
}
