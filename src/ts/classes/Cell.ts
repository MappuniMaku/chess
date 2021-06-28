import { Colors } from './types';

type CellData = {
    id: number;
    row: number;
    col: number;
    color: Colors;
}

export class Cell {
    data: CellData;

    constructor(data: CellData) {
        this.data = data;
    }

    render(): string {
        return (`
            <div
                class="Chess__cell Chess__cell--${this.data.color}"
                data-cell="${this.data.id}"
                data-row="${this.data.row}"
                data-column="${this.data.col}"
            ></div>
        `);
    }
}
