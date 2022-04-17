import { Board } from "./Board";
import { PieceColor, PieceType } from "../types";

export class App {
  $el: HTMLDivElement;
  board: Board;

  constructor($el: HTMLDivElement) {
    this.$el = $el;
    this.board = new Board($el);
    this.init();
  }

  init(): void {
    const blackPawnsArr = Array.from({ length: 8 }).map((_, index) => ({
      row: 2,
      col: index + 1,
    }));
    blackPawnsArr.forEach((item) => {
      this.board.addPiece(PieceType.Pawn, PieceColor.Black, item);
    });

    const whitePawnsArr = Array.from({ length: 8 }).map((_, index) => ({
      row: 7,
      col: index + 1,
    }));
    whitePawnsArr.forEach((item) => {
      this.board.addPiece(PieceType.Pawn, PieceColor.White, item);
    });

    this.board.addPiece(PieceType.Bishop, PieceColor.White, { row: 8, col: 3 });
    this.board.addPiece(PieceType.Bishop, PieceColor.White, { row: 8, col: 6 });
    this.board.addPiece(PieceType.Bishop, PieceColor.Black, { row: 1, col: 3 });
    this.board.addPiece(PieceType.Bishop, PieceColor.Black, { row: 1, col: 6 });

    this.board.addPiece(PieceType.Knight, PieceColor.White, { row: 8, col: 2 });
    this.board.addPiece(PieceType.Knight, PieceColor.White, { row: 8, col: 7 });
    this.board.addPiece(PieceType.Knight, PieceColor.Black, { row: 1, col: 2 });
    this.board.addPiece(PieceType.Knight, PieceColor.Black, { row: 1, col: 7 });

    this.board.addPiece(PieceType.Rook, PieceColor.White, { row: 8, col: 1 });
    this.board.addPiece(PieceType.Rook, PieceColor.White, { row: 8, col: 8 });
    this.board.addPiece(PieceType.Rook, PieceColor.Black, { row: 1, col: 1 });
    this.board.addPiece(PieceType.Rook, PieceColor.Black, { row: 1, col: 8 });

    this.board.addPiece(PieceType.King, PieceColor.White, { row: 8, col: 5 });
    this.board.addPiece(PieceType.King, PieceColor.Black, { row: 1, col: 5 });

    this.board.addPiece(PieceType.Queen, PieceColor.White, { row: 8, col: 4 });
    this.board.addPiece(PieceType.Queen, PieceColor.Black, { row: 1, col: 4 });
  }
}
