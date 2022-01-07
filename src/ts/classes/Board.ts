import { Color, PieceType, PieceColor, PiecePosition } from "../types";
import { Cell } from "./Cell";
import { isEven } from "../utils";
import { Piece } from "./Piece";
import { Bishop, Knight, Pawn, Rook, King, Queen } from "./pieces";

const PIECES_DICTIONARY: Record<PieceType, typeof Piece> = {
  bishop: Bishop,
  knight: Knight,
  pawn: Pawn,
  rook: Rook,
  king: King,
  queen: Queen,
};

const cellsContainerId = "cells-container";

export class Board {
  $el: HTMLElement;
  $cellsContainer: HTMLElement;
  pieces: Piece[];
  $activePiece: Piece | null;

  constructor($el: HTMLElement) {
    this.$el = $el;
    this.render();
    this.$cellsContainer = document.getElementById(
      cellsContainerId
    ) as HTMLElement;
    this.pieces = [];
    this.$cellsContainer.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    this.$activePiece = null;
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  render(): void {
    const cellsArr = Array.from({ length: 64 })
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
      .map((item) => new Cell(item).render());

    const numbersArr = Array.from({ length: 8 }).map((_, index) => index + 1);
    const letters = numbersArr.map(
      (item) =>
        `<div class="Chess__letter">${String.fromCharCode(item + 64)}</div>`
    );
    const numbers = numbersArr.map(
      (item) => `<div class="Chess__number">${item}</div>`
    );

    const html = `
      <div class="Chess__board">
        <div class="Chess__letters">
          ${letters.join("")}
        </div>
        
        <div class="Chess__numbers">
          ${numbers.join("")}
        </div>
        
        <div class="Chess__cellsWrapper" id="${cellsContainerId}">
          ${cellsArr.join("")}
        </div>
      </div>
  `;
    this.$el.insertAdjacentHTML("beforeend", html);
  }

  addPiece(
    pieceType: PieceType,
    color: PieceColor,
    position: PiecePosition
  ): void {
    const TargetPiece = PIECES_DICTIONARY[pieceType];
    const pieceInstance = new TargetPiece({
      color,
      position,
      id: this.pieces.length,
    });
    const $piece = pieceInstance.$el;

    $piece.classList.add("Chess__piece");
    const { left, top } = this.calculatePositionStyles(position);
    $piece.style.left = left;
    $piece.style.top = top;
    this.pieces.push(pieceInstance);
    this.$cellsContainer.append($piece);
  }

  calculatePositionStyles(position: PiecePosition): {
    left: string;
    top: string;
  } {
    return {
      left: `${((position.col - 1) * 100) / 8}%`,
      top: `${((position.row - 1) * 100) / 8}%`,
    };
  }

  movePiece(id: number, position: PiecePosition): void {
    const targetInstance = this.pieces.find((item) => item.id === id);
    if (targetInstance === undefined) {
      throw new Error("Piece object with target ID not found");
    }
    targetInstance.position = position;
    const $targetPieceEl = this.$cellsContainer.querySelector(
      `[data-piece-id="${id}"]`
    ) as HTMLImageElement;
    if ($targetPieceEl === null) {
      throw new Error("Piece element with target ID not found");
    }
    const { left, top } = this.calculatePositionStyles(position);
    $targetPieceEl.style.left = left;
    $targetPieceEl.style.top = top;
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
    this.$cellsContainer.style.cursor = "grabbing";
    const piecesArr: NodeListOf<HTMLImageElement> =
      this.$cellsContainer.querySelectorAll("[data-piece-id]");
    piecesArr.forEach((item) => {
      item.style.pointerEvents = "none";
    });

    this.clearListeners = this.clearListeners.bind(this, piecesArr);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$cellsContainer.addEventListener("mouseup", this.handleMouseUp);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$cellsContainer.addEventListener("mousemove", this.handleMouseMove);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$cellsContainer.addEventListener("mouseleave", this.handleMouseLeave);
  }

  handleMouseLeave(): void {
    if (this.$activePiece === null) {
      throw new Error("Active piece is null in handleMouseLeave");
    }
    const { id, position } = this.$activePiece;
    this.movePiece(id, position);
    this.clearListeners();
  }

  handleMouseMove(mousemoveEvent: MouseEvent): void {
    const { offsetLeft, offsetTop } = this.$cellsContainer;
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
    const { pieceId } = this.$activePiece?.$el.dataset ?? {};
    if (pieceId === undefined) {
      throw new Error("Piece id is undefined in handleMouseUp");
    }
    this.movePiece(Number(pieceId), {
      row: Number(row),
      col: Number(column),
    });
    this.clearListeners();
  }

  clearListeners(piecesArr?: NodeListOf<HTMLImageElement>): void {
    if (piecesArr === undefined) {
      throw new Error("Pieces array passed undefined to clearListeners");
    }
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$cellsContainer.removeEventListener("mousemove", this.handleMouseMove);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$cellsContainer.removeEventListener("mouseup", this.handleMouseUp);
    this.$cellsContainer.removeEventListener(
      "mouseleave",
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.handleMouseLeave
    );
    piecesArr.forEach((item) => {
      item.style.pointerEvents = "auto";
    });
    this.$cellsContainer.style.cursor = "default";
  }
}
