import { Piece } from "../Piece";
import {
  PieceColor,
  PieceType,
  IPieceProps,
  IPiecePosition,
} from "../../types";
import {
  getCellIdFromPosition,
  removeInvalidPositions,
  setPieceElementProperties,
} from "../../helpers";

export class Pawn extends Piece {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Pawn, this.color);
  }

  getMoves(): number[] {
    const { row, col } = this.position;
    const positions: IPiecePosition[] = [];
    const possibleHits: number[] = [];
    switch (this.color) {
      case PieceColor.Black:
        possibleHits.push(
          ...removeInvalidPositions([
            { row: row + 1, col: col - 1 },
            { row: row + 1, col: col + 1 },
          ]).map(getCellIdFromPosition)
        );
        if (row === 2) {
          positions.push({ row: 3, col }, { row: 4, col });
          break;
        }
        positions.push({ row: row + 1, col });
        break;
      case PieceColor.White:
        possibleHits.push(
          ...removeInvalidPositions([
            { row: row - 1, col: col - 1 },
            { row: row - 1, col: col + 1 },
          ]).map(getCellIdFromPosition)
        );
        if (row === 7) {
          positions.push({ row: 6, col }, { row: 5, col });
          break;
        }
        positions.push({ row: row - 1, col });
    }
    const filteredPossibleHits = possibleHits.filter((item) =>
      this.pieces.some(
        (piece) =>
          piece.color !== this.color &&
          getCellIdFromPosition(piece.position) === item
      )
    );
    const positionsIds = positions.map(getCellIdFromPosition);

    if (
      this.pieces.some(
        (piece) => getCellIdFromPosition(piece.position) === positionsIds[0]
      )
    ) {
      return filteredPossibleHits;
    }

    if (
      this.pieces.some(
        (piece) => getCellIdFromPosition(piece.position) === positionsIds[1]
      )
    ) {
      return [...filteredPossibleHits, positionsIds[0]];
    }

    return [...filteredPossibleHits, ...positionsIds];
  }
}
