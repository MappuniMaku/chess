import { FigureType, Cell, MovementResult, PlayerColor, IFigure } from '../../types';
import { Board } from '../Board';
import { createDiv } from '../../utils';
import { CONSTANTS } from '../../constants';

const { CELL_SIZE, BOARD_SIZE } = CONSTANTS;

export type FigureProps = {
    board: Board,
    cell: Cell;
    color: PlayerColor,
    type: FigureType,
}

export abstract class Figure {
    board: Board;
    cell: Cell;
    color: PlayerColor;
    type: FigureType;
    isOnStartPosition = true;
    $el: HTMLElement | null = null;

    protected constructor(props: FigureProps) {
        this.cell = props.cell;
        this.color = props.color;
        this.type = props.type;
        this.board = props.board;

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

    moveTo(cell: Cell): void {
        this.cell = cell;
        this.updatePosition();
        this.isOnStartPosition = false;
    }

    isEnemyFigure(figure: IFigure): boolean {
        return figure.color !== this.color;
    }

    getMovementRay(rowOffset = 0, colOffset = 0): MovementResult {
        const cellsToMove: Cell[] = [];
        const cellsToAttack: Cell[] = [];
        const { col, row } = this.cell;
        let curCell = { col: col + colOffset, row: row + rowOffset };

        while (this.board.checkCellExisting(curCell) && !this.board.hasFigureOnCell(curCell)) {
            cellsToMove.push(curCell);
            curCell = { col: curCell.col + colOffset, row: curCell.row + rowOffset };
        }

        if (this.board.checkCellExisting(curCell)) {
            const figure = this.board.getFigureOnCell(curCell);
            if (figure !== null && this.isEnemyFigure(figure)) {
                cellsToAttack.push(curCell);
            }
        }

        return { cellsToMove, cellsToAttack };
    }
}