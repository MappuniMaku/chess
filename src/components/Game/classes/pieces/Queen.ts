import { Piece } from '../Piece';
import { IPieceProps, IQueen } from 'types';
import { PieceType } from 'enums';
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

export class Queen extends Piece implements IQueen {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Queen, this.color);
  }

  getLines() {
    return [
      getTopLine(this.position),
      getRightLine(this.position),
      getBottomLine(this.position),
      getLeftLine(this.position),
      getTopLeftDiagonal(this.position),
      getTopRightDiagonal(this.position),
      getBottomRightDiagonal(this.position),
      getBottomLeftDiagonal(this.position),
    ];
  }
}
