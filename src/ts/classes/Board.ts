import { Cell, PlayerColor, IFigure, FigureType, BoardCell } from '../types';
import { CONSTANTS } from '../constants';
import { createDiv } from '../utils';
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

        //if (cell === null) return;

        //const { figure } = this.getBoardCell(cell);
        //if (figure !== null) {
        //    this.highlightCells(figure.getCellsToMove(cell));
        //}
    }

    getBoardCell(cell: Cell): BoardCell {
        return this.cells[cell.row][cell.col];
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

    highlightCells(cells: Cell[]): void {
        this.$board?.querySelectorAll('.Chess__cell--highlighted').forEach(($el) => {
            $el.classList.remove('Chess__cell--highlighted');
        });

        cells.forEach(cell => {
            const { $cell } = this.getBoardCell(cell);
            $cell.classList.add('Chess__cell--highlighted');
        });
    }

    createBoard() {
        this.$board = createDiv('Chess__board');

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

    createFigure(type: FigureType, color: PlayerColor, cell: Cell): void {
        const figure: IFigure = new figures[type]({ color, cell });

        if (figure.$el !== null) {
            this.$figures?.append(figure.$el);
        }

        this.getBoardCell(cell).figure = figure;
    }
}