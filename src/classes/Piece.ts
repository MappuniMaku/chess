import { PieceColor, IPiecePosition, IPieceProps } from "../types";
import { calculatePositionStyles, getCellIdFromPosition } from "../helpers";

export class Piece implements IPieceProps {
  readonly id: number;
  position: IPiecePosition;
  cellId: number;
  readonly pieces: IPieceProps[];
  readonly color: PieceColor;
  readonly $el: HTMLImageElement;

  constructor(props: IPieceProps) {
    const { id, position, color, pieces, cellId } = props;
    this.id = id;
    this.position = position;
    this.cellId = cellId;
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
    this.cellId = getCellIdFromPosition(position);
    const { left, top } = calculatePositionStyles(position);
    this.$el.style.left = left;
    this.$el.style.top = top;
  }

  getMoves(): number[] {
    console.warn("getMoves() method for this piece is absent");
    return [];
  }
}
