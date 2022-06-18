import { Piece } from '../Piece';
import { IKing, IPieceProps, IRook } from '../../types';
import { PieceColor, PieceType } from '../../enums';
import {
  getBottomLeftDiagonal,
  getBottomLine,
  getBottomRightDiagonal,
  getLeftLine,
  getRightLine,
  getTopLeftDiagonal,
  getTopLine,
  getTopRightDiagonal,
  setPieceElementProperties,
} from '../../helpers';

export class King extends Piece implements IKing {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.King, this.color);
  }

  getIds() {
    return [
      getTopLine(this.position)[0] ?? [],
      getBottomLine(this.position)[0] ?? [],
      getLeftLine(this.position)[0] ?? [],
      getRightLine(this.position)[0] ?? [],
      getTopLeftDiagonal(this.position)[0] ?? [],
      getTopRightDiagonal(this.position)[0] ?? [],
      getBottomLeftDiagonal(this.position)[0] ?? [],
      getBottomRightDiagonal(this.position)[0] ?? [],
    ].flat();
  }

  getPossibleCastles() {
    if (this.getKingCheckers().length > 0 || this.hasMadeAnyMoves) {
      return [];
    }
    const getCastlingCell = (
      rook: IRook | undefined,
      castlingCells: number[],
      targetCell: number,
      isCastlingLong = false,
    ): number | undefined => {
      if (
        rook !== undefined &&
        !rook.hasMadeAnyMoves &&
        !this.pieces.some((p) => castlingCells.includes(p.cellId)) &&
        !castlingCells
          .slice(isCastlingLong ? 1 : 0)
          .some((id) => attackedCells.includes(id))
      ) {
        return targetCell;
      }
      return undefined;
    };
    const result: number[] = [];
    const { color } = this;
    const enemyPieces = this.pieces.filter((p) => p.color !== color);
    const attackedCells = this.getAttackedCells(enemyPieces);
    switch (color) {
      case PieceColor.White:
        const whiteLeftRook = this.pieces.find(
          (p) =>
            p.cellId === 56 && p.type === PieceType.Rook && p.color === color,
        ) as IRook | undefined;
        const whiteLeftCastlingCells = [57, 58, 59];
        const whiteLeftTargetCell = 58;
        if (
          getCastlingCell(
            whiteLeftRook,
            whiteLeftCastlingCells,
            whiteLeftTargetCell,
            true,
          ) !== undefined
        ) {
          result.push(whiteLeftTargetCell);
        }
        const whiteRightRook = this.pieces.find(
          (p) =>
            p.cellId === 63 && p.type === PieceType.Rook && p.color === color,
        ) as IRook | undefined;
        const whiteRightCastlingCells = [61, 62];
        const whiteRightTargetCell = 62;
        if (
          getCastlingCell(
            whiteRightRook,
            whiteRightCastlingCells,
            whiteRightTargetCell,
          ) !== undefined
        ) {
          result.push(whiteRightTargetCell);
        }
        break;
      case PieceColor.Black:
        const blackLeftRook = this.pieces.find(
          (p) =>
            p.cellId === 0 && p.type === PieceType.Rook && p.color === color,
        ) as IRook | undefined;
        const blackLeftCastlingCells = [1, 2, 3];
        const blackLeftTargetCell = 2;
        if (
          getCastlingCell(
            blackLeftRook,
            blackLeftCastlingCells,
            blackLeftTargetCell,
            true,
          ) !== undefined
        ) {
          result.push(blackLeftTargetCell);
        }
        const blackRightRook = this.pieces.find(
          (p) =>
            p.cellId === 7 && p.type === PieceType.Rook && p.color === color,
        ) as IRook | undefined;
        const blackRightCastlingCells = [5, 6];
        const blackRightTargetCell = 6;
        if (
          getCastlingCell(
            blackRightRook,
            blackRightCastlingCells,
            blackRightTargetCell,
          ) !== undefined
        ) {
          result.push(blackRightTargetCell);
        }
        break;
    }
    return result;
  }
}
