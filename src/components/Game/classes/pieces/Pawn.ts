import { Piece } from '../Piece';
import { IPieceProps, IPiecePosition, IPawn } from '@/types';
import { PieceColor, PieceType } from '@/enums';
import {
  getCellIdFromPosition,
  removeInvalidPositions,
  setPieceElementProperties,
} from '../../helpers';

export class Pawn extends Piece implements IPawn {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Pawn, this.color);
  }

  getPossibleHits() {
    const { row, col } = this.position;
    const possibleHits: number[] = [];
    switch (this.color) {
      case PieceColor.Black:
        possibleHits.push(
          ...removeInvalidPositions([
            { row: row + 1, col: col - 1 },
            { row: row + 1, col: col + 1 },
          ]).map(getCellIdFromPosition),
        );
        break;
      case PieceColor.White:
        possibleHits.push(
          ...removeInvalidPositions([
            { row: row - 1, col: col - 1 },
            { row: row - 1, col: col + 1 },
          ]).map(getCellIdFromPosition),
        );
    }
    return possibleHits;
  }

  getPossibleUnPassantMove() {
    // Here we check if the pawn can be hit by en passant
    const prevMove = this.movesLog.length > 0 ? this.movesLog[this.movesLog.length - 1] : undefined;
    if (
      prevMove === undefined ||
      prevMove.piece.type !== PieceType.Pawn ||
      (prevMove.initialPosition.col !== this.position.col - 1 &&
        prevMove.initialPosition.col !== this.position.col + 1)
    ) {
      return undefined;
    }
    if (
      this.color === PieceColor.Black &&
      this.position.row === 5 &&
      prevMove.initialPosition.row === 7 &&
      prevMove.finalPosition.row === 5
    ) {
      return getCellIdFromPosition({
        row: 6,
        col: prevMove.initialPosition.col,
      });
    }
    if (
      this.color === PieceColor.White &&
      this.position.row === 4 &&
      prevMove.initialPosition.row === 2 &&
      prevMove.finalPosition.row === 4
    ) {
      return getCellIdFromPosition({
        row: 3,
        col: prevMove.initialPosition.col,
      });
    }
    return undefined;
  }

  getMoves() {
    const { row, col } = this.position;
    const positions: IPiecePosition[] = [];
    switch (this.color) {
      case PieceColor.Black:
        if (row === 2) {
          positions.push({ row: 3, col }, { row: 4, col });
          break;
        }
        positions.push({ row: row + 1, col });
        break;
      case PieceColor.White:
        if (row === 7) {
          positions.push({ row: 6, col }, { row: 5, col });
          break;
        }
        positions.push({ row: row - 1, col });
    }
    const possibleHits = this.getPossibleHits().filter((item) =>
      this.pieces.some((piece) => piece.color !== this.color && piece.cellId === item),
    );
    const enPassantMove = this.getPossibleUnPassantMove();
    if (enPassantMove !== undefined) {
      possibleHits.push(enPassantMove);
    }

    const positionsIds = positions.map(getCellIdFromPosition);

    if (this.pieces.some((piece) => piece.cellId === positionsIds[0])) {
      return possibleHits;
    }

    if (this.pieces.some((piece) => piece.cellId === positionsIds[1])) {
      return [...possibleHits, positionsIds[0]];
    }

    return [...possibleHits, ...positionsIds];
  }
}
