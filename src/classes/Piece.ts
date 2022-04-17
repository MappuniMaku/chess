import { PieceColor, PiecePosition } from "../types";
import { calculatePositionStyles } from "../helpers";

export type PieceProps = {
  position: PiecePosition;
  color: PieceColor;
  id: number;
};

export class Piece {
  position: PiecePosition;
  color: PieceColor;
  id: number;
  $el: HTMLImageElement;

  constructor(props: PieceProps) {
    const { id, position, color } = props;
    this.id = id;
    this.position = position;
    this.color = color;
    this.$el = this.getElement();
    this.setPosition(position);
  }

  private getElement(): HTMLImageElement {
    const el = document.createElement("img");
    el.dataset.pieceId = String(this.id);
    el.draggable = false;
    el.classList.add("Chess__piece");
    return el;
  }

  setPosition(position: PiecePosition): void {
    this.position = position;
    const { left, top } = calculatePositionStyles(position);
    this.$el.style.left = left;
    this.$el.style.top = top;
  }

  getMoves(): number[] {
    console.warn("getMoves() method for this piece is absent");
    return [];
  }
}
