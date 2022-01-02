import { Board } from "./Board";
import { PieceColor, PieceType } from "./types";

export class App {
  $el: HTMLElement;
  board: Board;

  constructor($el: HTMLElement) {
    this.$el = $el;
    this.board = new Board($el);
    this.init();
  }

  init(): void {
    const blackPawnsArr = Array.from({ length: 8 }).map((item, index) => ({
      row: 2,
      col: index + 1,
    }));
    blackPawnsArr.forEach((item) => {
      this.board.addPiece(PieceType.Pawn, PieceColor.Black, item);
    });

    const whitePawnsArr = Array.from({ length: 8 }).map((item, index) => ({
      row: 7,
      col: index + 1,
    }));
    whitePawnsArr.forEach((item) => {
      this.board.addPiece(PieceType.Pawn, PieceColor.White, item);
    });
  }
}
