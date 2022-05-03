import { Color } from "../types";

interface ICellProps {
  id: number;
  row: number;
  col: number;
  color: Color;
}

export class Cell {
  id: number;
  row: number;
  col: number;
  color: Color;
  $el: HTMLDivElement;

  constructor(props: ICellProps) {
    const { id, row, col, color } = props;
    this.id = id;
    this.row = row;
    this.col = col;
    this.color = color;
    this.$el = this.getElement();
  }

  private getElement(): HTMLDivElement {
    const el = document.createElement("div");
    el.dataset.cell = String(this.id);
    el.dataset.row = String(this.row);
    el.dataset.column = String(this.col);
    el.classList.add("Chess__cell", `Chess__cell--${this.color}`);
    return el;
  }

  addAvailableMoveState(): void {
    this.$el.classList.add("Chess__cell--availableMove");
  }

  addAvailableHitState(): void {
    this.$el.classList.add("Chess__cell--availableHit");
  }

  removeAvailableMoveState(): void {
    this.$el.classList.remove("Chess__cell--availableMove");
    this.$el.classList.remove("Chess__cell--availableHit");
  }
}
