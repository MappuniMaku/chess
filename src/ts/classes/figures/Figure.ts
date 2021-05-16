import { FigureType, Cell, MovesList, PlayerColor, IFigure } from '../../types';
import { Board } from '../Board';
import { createDiv } from '../../utils';
import { CONSTANTS, EVENTS } from '../../constants';
import { observer } from '../Observer';

const { CELL_SIZE } = CONSTANTS;

export type FigureProps = {
    board: Board,
    cell: Cell;
    color: PlayerColor,
    type: FigureType,
}

export abstract class Figure implements IFigure{
    board: Board;
    cell: Cell;
    color: PlayerColor;
    type: FigureType;
    isOnStartPosition = true;
    $el: HTMLElement | null = null;
    bindedOnSelect: () => void;

    protected constructor(props: FigureProps) {
        this.cell = props.cell;
        this.color = props.color;
        this.type = props.type;
        this.board = props.board;

        this.bindedOnSelect = this.onSelect.bind(this);

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

    abstract getPossibleMoves(): MovesList;

    getMovesRay(rowOffset = 0, colOffset = 0): MovesList {
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

    showPossibleMoves(): MovesList {
        const moves = this.getPossibleMoves();
        this.board.highlightPossibleMoves(moves);

        return moves;
    }

    onSelect(): void {
        const moves = this.showPossibleMoves();
        if (moves.cellsToMove.length === 0 && moves.cellsToAttack.length === 0) return;

        observer.dispatch(EVENTS.FIGURE_SELECTED, this, moves);
    }

    listenPlayerCommands(): void {
        this.$el?.addEventListener('click', this.bindedOnSelect);
    }

    stopListenPlayerCommands(): void {
        this.$el?.removeEventListener('click', this.bindedOnSelect);
    }
}