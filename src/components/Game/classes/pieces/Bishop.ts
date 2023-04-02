import { Piece } from '../Piece';
import { IBishop, IPieceProps } from '@/types';
import { PieceType } from '@/enums';
import {
  getTopLeftDiagonal,
  getTopRightDiagonal,
  getBottomRightDiagonal,
  getBottomLeftDiagonal,
  setPieceElementProperties,
} from '../../helpers';

export class Bishop extends Piece implements IBishop {
  constructor(props: IPieceProps) {
    super(props);
    setPieceElementProperties(this.$el, PieceType.Bishop, this.color);
  }

  getLines() {
    return [
      getTopLeftDiagonal(this.position),
      getTopRightDiagonal(this.position),
      getBottomRightDiagonal(this.position),
      getBottomLeftDiagonal(this.position),
    ];
  }
}
