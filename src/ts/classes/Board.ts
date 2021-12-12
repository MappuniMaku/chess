import { Color, PieceType, PieceColor, PiecePosition } from "./types";
import { Cell } from "./Cell";
import { isEven } from "./utils";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";

const piecesDictionary = {
  pawn: Pawn,
};

const cellsContainerId = "cells-container";

export class Board {
  $el: HTMLElement;
  $cellsContainer: HTMLElement;
  pieces: Piece[];

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
    const TargetPiece = piecesDictionary[pieceType];
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
    const { target } = event;
    if (target === null) {
      return;
    }
    const { pieceId } = (target as HTMLElement).dataset;
    if (pieceId === undefined) {
      return;
    }
    const handleMouseUp = (mouseupEvent: MouseEvent) => {
      const { target: mouseupTarget } = mouseupEvent;
      if (mouseupTarget === null) {
        return;
      }
      const { row, column } = (mouseupTarget as HTMLElement).dataset;
      if (row === undefined || column === undefined) {
        return;
      }
      this.movePiece(Number(pieceId), {
        row: Number(row),
        col: Number(column),
      });
    };

    this.$cellsContainer.addEventListener("mouseup", handleMouseUp, {
      once: true,
    });
  }
}
