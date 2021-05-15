import { FigureType, Cell, PlayerColor } from '../../types';
import { createDiv } from '../../utils';
import { CONSTANTS } from '../../constants';

const { CELL_SIZE } = CONSTANTS;

export type FigureProps = {
    cell: Cell;
    color: PlayerColor,
    type: FigureType,
}

export abstract class Figure {
    cell: Cell;
    color: PlayerColor;
    type: FigureType;
    $el: HTMLElement | null = null;

    constructor(props: FigureProps) {
        this.cell = props.cell;
        this.color = props.color;
        this.type = props.type;

        this.initHTMLElement();
    }

    initHTMLElement(): void {
        this.$el = createDiv(
            `Chess__figure Chess__figure--${this.color.toString()} 
            ${this.type !== null ? `Chess__figure--${this.type.toString()}` : ''}`
        );
        this.updatePosition();
    }

    updatePosition(): void {
        if (this.$el === null) return;

        this.$el.style.top = `${String(CELL_SIZE * (this.cell.row + 1))}px`;
        this.$el.style.left = `${String(CELL_SIZE * (this.cell.col + 1))}px`;
    }

    move(cell: Cell): void {
        this.cell = cell;
        this.updatePosition();
    }
}