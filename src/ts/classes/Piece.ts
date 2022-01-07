import { PieceColor, PiecePosition } from "../types";

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
    this.position = props.position;
    this.color = props.color;
    this.id = props.id;
    this.$el = document.createElement("img");
    this.$el.dataset.pieceId = String(props.id);
    this.$el.draggable = false;
  }
}
