import { PieceColor, IPiecePosition, IPieceProps } from "../types";
import { calculatePositionStyles } from "../helpers";

export class Piece implements IPieceProps {
  readonly id: number;
  position: IPiecePosition;
  readonly pieces: IPieceProps[];
  readonly color: PieceColor;
  readonly $el: HTMLImageElement;

  constructor(props: IPieceProps) {
    const { id, position, color, pieces } = props;
    this.id = id;
    this.position = position;
    this.color = color;
    this.pieces = pieces;
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

  setPosition(position: IPiecePosition): void {
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
