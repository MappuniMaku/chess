import './index.scss';
import { Board } from './classes/Board';
import { PieceColor, PieceType } from '@/enums';
import { IBackendMove } from '@/types';
import { isArrayNotEmpty } from '@/helpers';

export class Game {
  board: Board;

  constructor({
    $el,
    playerColor,
    movesLog,
    onMakeMove,
  }: {
    $el: HTMLDivElement;
    playerColor: PieceColor;
    movesLog?: IBackendMove[];
    onMakeMove(move: IBackendMove): void;
  }) {
    const $boardEl = document.createElement('div');
    $boardEl.classList.add('Chess');
    $el.appendChild($boardEl);
    this.board = new Board({ $el: $boardEl, playerColor, onMakeMove });
    this.init();
    if (isArrayNotEmpty(movesLog)) {
      this.board.recoverPositionFromMovesLog(movesLog);
    }
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
