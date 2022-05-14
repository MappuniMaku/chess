import { IPiecePosition } from "../types";
import { Color, PieceColor, PieceType } from "../enums";
import { Cell } from "./Cell";
import { isEven } from "../utils";
import { Piece } from "./Piece";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./pieces";
import { getCellIdFromPosition } from "../helpers";

const PIECES_DICTIONARY: Record<PieceType, typeof Piece> = {
  bishop: Bishop,
  knight: Knight,
  pawn: Pawn,
  rook: Rook,
  king: King,
  queen: Queen,
};

const boardId = "board";
const cellsContainerId = "cells-container";

export class Board {
  $el: HTMLDivElement;
  $board: HTMLDivElement;
  $cellsContainer: HTMLDivElement;
  cells: Cell[];
  pieces: Piece[];
  $activePiece: Piece | null;
  activePiecePossibleMoves: number[];

  constructor($el: HTMLDivElement) {
    this.$el = $el;
    this.render();
    this.$board = document.getElementById(boardId) as HTMLDivElement;
    this.$cellsContainer = document.getElementById(
      cellsContainerId
    ) as HTMLDivElement;
    this.cells = this.getInitialCells();
    this.renderCells();
    this.pieces = [];
    this.$board.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.$activePiece = null;
    this.activePiecePossibleMoves = [];
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  render(): void {
    const numbersArr = Array.from({ length: 8 }).map((_, index) => index + 1);
    const letters = numbersArr.map(
      (item) =>
        `<div class="Chess__letter">${String.fromCharCode(item + 64)}</div>`
    );
    const numbers = numbersArr.map(
      (item) => `<div class="Chess__number">${item}</div>`
    );

    const html = `
      <div class="Chess__boardWrapper">
        <div class="Chess__letters">
          ${letters.join("")}
        </div>
        
        <div class="Chess__numbers">
          ${numbers.join("")}
        </div>
        
        <div class="Chess__board" id="${boardId}">
          <div class="Chess__cellsContainer" id="${cellsContainerId}"></div>
        </div>
      </div>
  `;
    this.$el.insertAdjacentHTML("beforeend", html);
  }

  getInitialCells(): Cell[] {
    return Array.from({ length: 64 })
      .map((_, index) => {
        const row = Math.floor(index / 8) + 1;
        const col = (index % 8) + 1;
        let color: Color;

        if (isEven(row)) {
          color = isEven(col) ? Color.Light : Color.Dark;
        } else {
          color = isEven(col) ? Color.Dark : Color.Light;
        }

        return {
          id: index,
          row,
          col,
          color,
        };
      })
      .map((item) => new Cell(item));
  }

  renderCells(): void {
    this.cells.forEach((cell) => this.$cellsContainer.appendChild(cell.$el));
  }

  addPiece(
    pieceType: PieceType,
    color: PieceColor,
    position: IPiecePosition
  ): void {
    const TargetPiece = PIECES_DICTIONARY[pieceType];
    const piece = new TargetPiece({
      color,
      position,
      cellId: getCellIdFromPosition(position),
      id: this.pieces.length,
      pieces: this.pieces,
      type: pieceType,
      hasMadeAnyMoves: false,
    });
    this.pieces.push(piece);
    this.$board.appendChild(piece.$el);
  }

  removePiece(piece: Piece): void {
    const targetPieceIndex = this.pieces.findIndex(
      (item) => item.id === piece.id
    );
    if (targetPieceIndex === -1) {
      throw new Error(`Cannot find piece with id ${piece.id}`);
    }
    this.pieces.splice(targetPieceIndex, 1);
    this.$board.removeChild(piece.$el);
  }

  movePiece(id: number, position: IPiecePosition): void {
    const targetPiece = this.pieces.find((item) => item.id === id);
    if (targetPiece === undefined) {
      throw new Error("Piece object with target ID not found");
    }
    targetPiece.setPosition(position);
  }

  handleMouseDown(event: MouseEvent): void {
    const piece = event.target as HTMLImageElement;
    if (piece === null) {
      return;
    }
    const { pieceId } = piece.dataset;
    if (pieceId === undefined) {
      return;
    }
    const activePiece = this.pieces.find((item) => item.id === Number(pieceId));
    if (activePiece === undefined) {
      throw new Error("Active piece not found");
    }

    this.$activePiece = activePiece;
    this.activePiecePossibleMoves = activePiece.getValidMoves();

    this.showAvailableCells();
    this.$board.style.cursor = "grabbing";
    const piecesArr: NodeListOf<HTMLImageElement> =
      this.$board.querySelectorAll("[data-piece-id]");
    piecesArr.forEach((item) => {
      item.style.pointerEvents = "none";
    });

    this.clearListeners = this.clearListeners.bind(this, piecesArr);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$board.addEventListener("mouseup", this.handleMouseUp);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$board.addEventListener("mousemove", this.handleMouseMove);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$board.addEventListener("mouseleave", this.handleMouseLeave);
  }

  handleMouseLeave(): void {
    if (this.$activePiece === null) {
      throw new Error("Active piece is null in handleMouseLeave");
    }
    const { id, position } = this.$activePiece;
    this.movePiece(id, position);
    this.clearActivePiece();
    this.clearAvailableCells();
    this.clearListeners();
  }

  handleMouseMove(mousemoveEvent: MouseEvent): void {
    const { offsetLeft, offsetTop } = this.$board;
    if (this.$activePiece === null) {
      throw new Error("Active piece is null");
    }
    const { $el: activePieceElement } = this.$activePiece;
    const { offsetWidth, offsetHeight } = activePieceElement;
    const { pageX, pageY } = mousemoveEvent;
    activePieceElement.style.left = `${pageX - offsetLeft - offsetWidth / 2}px`;
    activePieceElement.style.top = `${pageY - offsetTop - offsetHeight / 2}px`;
  }

  handleMouseUp(mouseupEvent: MouseEvent): void {
    const mouseupTarget = mouseupEvent.target as HTMLElement;
    if (mouseupTarget === null) {
      throw new Error("Mouseup target is null in handleMouseUp");
    }
    const { row, column } = mouseupTarget.dataset;
    if (row === undefined || column === undefined) {
      throw new Error("Mouseup target is not a cell");
    }
    const targetRow = Number(row);
    const targetCol = Number(column);

    if (this.$activePiece === null) {
      throw new Error("Active piece is null in handleMouseUp");
    }
    const { id: pieceId, position: startingPosition } = this.$activePiece;

    const targetCellId = getCellIdFromPosition({
      row: targetRow,
      col: targetCol,
    });

    const isMoveAvailable =
      this.activePiecePossibleMoves.includes(targetCellId);
    if (isMoveAvailable && this.$activePiece.type === PieceType.King) {
      const { king } = this.$activePiece.getKingInfo();
      if (king.getPossibleCastles().includes(targetCellId)) {
        const { rook, targetPosition } = king.getCastlingRook(targetCellId);
        this.movePiece(rook.id, targetPosition);
      }
    }
    this.movePiece(
      pieceId,
      isMoveAvailable
        ? {
            row: targetRow,
            col: targetCol,
          }
        : startingPosition
    );
    if (isMoveAvailable) {
      this.$activePiece.hasMadeAnyMoves = true;
      const enemyPiece = this.pieces.find(
        (piece) =>
          piece.color !== this.$activePiece?.color &&
          piece.cellId === targetCellId
      );
      if (enemyPiece !== undefined) {
        this.removePiece(enemyPiece);
      }
    }

    this.clearActivePiece();
    this.clearAvailableCells();
    this.clearListeners();
  }

  clearListeners(piecesArr?: NodeListOf<HTMLImageElement>): void {
    if (piecesArr === undefined) {
      throw new Error("Pieces array passed undefined to clearListeners");
    }
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$board.removeEventListener("mousemove", this.handleMouseMove);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$board.removeEventListener("mouseup", this.handleMouseUp);
    this.$board.removeEventListener(
      "mouseleave",
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.handleMouseLeave
    );
    piecesArr.forEach((item) => {
      item.style.pointerEvents = "auto";
    });
    this.$board.style.cursor = "default";
  }

  showAvailableCells(): void {
    if (this.$activePiece === null) {
      throw new Error("Active piece is null in showAvailableCells");
    }
    const activePiece = this.$activePiece;
    if (
      this.activePiecePossibleMoves.length === 0 &&
      activePiece.getKingCheckers().length > 0
    ) {
      const kingCell = this.cells.find(
        (cell) => cell.id === activePiece.getKingInfo().king.cellId
      );
      if (kingCell === undefined) {
        throw new Error("Cannot find king cell");
      }
      kingCell.highlightCheck();
      return;
    }
    this.activePiecePossibleMoves.forEach((id) => {
      const cell = this.cells.find((item) => item.id === id);
      if (cell === undefined) {
        throw new Error(`Cell with id ${id} not found`);
      }
      if (this.pieces.some((piece) => piece.cellId === id)) {
        cell.addAvailableHitState();
        return;
      }
      cell.addAvailableMoveState();
    });
  }

  clearAvailableCells(): void {
    this.cells.forEach((cell) => {
      cell.removeAvailableMoveState();
    });
  }

  clearActivePiece(): void {
    this.$activePiece = null;
    this.activePiecePossibleMoves = [];
  }
}
