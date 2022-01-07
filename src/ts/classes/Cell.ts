import { Color } from "../types";

type CellProps = {
  id: number;
  row: number;
  col: number;
  color: Color;
};

export class Cell {
  props: CellProps;

  constructor(props: CellProps) {
    this.props = props;
  }

  render(): string {
    return `
      <div
        class="Chess__cell Chess__cell--${this.props.color}"
        data-cell="${this.props.id}"
        data-row="${this.props.row}"
        data-column="${this.props.col}"
      ></div>
  `;
  }
}
