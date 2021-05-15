import { Cell, PlayerColor, IFigure, FigureType, BoardCell, MovementResult } from '../types';
import { CONSTANTS } from '../constants';
import { createDiv, removeClassesFromElements } from '../utils';
import { figures } from "./figures/figures";

const { BOARD_SIZE, CELL_SIZE, LETTERS_START_CODE } = CONSTANTS;

type BoardParams = {
    root: HTMLElement,
}

export class Board {
    cells: ((BoardCell)[])[] = [];
    $board: HTMLElement | null = null;
    $figures: HTMLElement | null = null;

    constructor(params: BoardParams) {
        this.createBoard();
        this.createFiguresList();

        if (this.$board !== null) {
            params.root.append(this.$board);
        }
    }

    onBoardClick(event: MouseEvent): void {
        const cell = this.getCellFromMouseEvent(event);

        if (cell === null) return;

        const figure = this.getFigureOnCell(cell);
        if (figure !== null) {
            this.highlightMovements(figure.getPossibleMoves());
        }
    }

    checkCellExisting(cell: Cell): boolean {
        return cell.col >= 0 && cell.row >= 0 && cell.col < BOARD_SIZE && cell.row < BOARD_SIZE;
    }

    getBoardCell(cell: Cell): BoardCell | null {
        if (this.checkCellExisting(cell)) {
            return this.cells[cell.row][cell.col];
        }

        throw Error(`Cell doesnt exist: col: ${cell.col}, row: ${ cell.row }`);
    }

    getCellFromMouseEvent(event: MouseEvent): Cell | null {
        const rect = this.$board?.getBoundingClientRect();
        if (!rect) return null;

        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        if (
            x < CELL_SIZE || y < CELL_SIZE ||
            x > CELL_SIZE * (BOARD_SIZE + 1) || y > CELL_SIZE * (BOARD_SIZE + 1)
        ) return null;

        // remove headings offsets
        y -= CELL_SIZE;
        x -= CELL_SIZE;

        return { row: Math.floor(y / CELL_SIZE), col: Math.floor(x / CELL_SIZE) };
    }

    addClassesToCells(cells: Cell[], className: string): void {
        cells.forEach(cell => {
            const boardCell = this.getBoardCell(cell);
            if (boardCell !== null) {
                const { $cell } = boardCell;
                $cell.classList.add(className);
            }
        });
    }

    highlightMovements(movements: MovementResult): void {
        const MOVE_CLASS_NAME = 'Chess__cell--move';
        const ATTACK_CLASS_NAME = 'Chess__cell--attack';

        if (this.$board === null) return;

        removeClassesFromElements(this.$board, MOVE_CLASS_NAME);
        removeClassesFromElements(this.$board, ATTACK_CLASS_NAME);
        this.addClassesToCells(movements.cellsToMove, MOVE_CLASS_NAME);
        this.addClassesToCells(movements.cellsToAttack, ATTACK_CLASS_NAME);

    }

    createBoard(): void {
        this.$board = createDiv('Chess__board');
        // temporary
        this.$board.addEventListener('click', this.onBoardClick.bind(this));

        // create letters row
        const $lettersRow = createDiv('Chess__row');
        this.$board.append($lettersRow);

        // create empty cell for spacing and add it to start of letters headings
        const $emptyCell = createDiv('Chess__cell');
        $lettersRow.append($emptyCell);

        for (let i = 0; i < BOARD_SIZE; i++) {
            // create heading letter cells
            const $letterCell = createDiv('Chess__cell Chess__cell--heading');
            $letterCell.textContent = String.fromCharCode(LETTERS_START_CODE + i);
            $lettersRow.append($letterCell);

            // create row
            const $row = createDiv('Chess__row');

            // create heading number cell
            const $numberCell = createDiv('Chess__cell Chess__cell--heading');
            $numberCell.textContent = String(BOARD_SIZE - i);
            $row.append($numberCell);

            // create row in virtual copy of board
            this.cells.push([]);

            // create main chess cells
            for (let j = 0; j < BOARD_SIZE; j++) {
                const $cell = createDiv('Chess__cell Chess__cell--main');
                $row.append($cell);

                // create place for figures in virtual copy of board
                this.cells[i].push({ $cell, figure: null });
            }

            $row.append($numberCell.cloneNode(true));
            this.$board.append($row);
        }

        // add empty cell to end of letters headings
        $lettersRow.append($emptyCell.cloneNode());
        this.$board.append($lettersRow.cloneNode(true));
    }

    createFiguresList(): void {
        this.$figures = createDiv('Chess__figures');
        this.$board?.append(this.$figures);
    }

    createFigure(type: FigureType, color: PlayerColor, cell: Cell): IFigure {
        const figure: IFigure = new figures[type]({ color, cell, board: this });

        if (figure.$el !== null) {
            this.$figures?.append(figure.$el);
        }

        const boardCell = this.getBoardCell(cell);
        if (boardCell !== null) {
            boardCell.figure = figure;
        }

        return figure;
    }

    getFigureOnCell(cell: Cell): IFigure | null {
        const boardCell = this.getBoardCell(cell);
        return boardCell !== null ? boardCell.figure : null;
    }

    hasFigureOnCell(cell: Cell): boolean {
        return this.getFigureOnCell(cell) !== null;
    }
}