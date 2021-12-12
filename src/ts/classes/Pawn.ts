import { Piece, PieceProps } from "./Piece";

export class Pawn extends Piece {
  constructor(props: PieceProps) {
    super(props);
    this.$el.src = `images/pieces/pawn-${this.color}.png`;
    this.$el.alt = `${this.color} pawn`;
  }
}
