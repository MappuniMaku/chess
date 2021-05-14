import { Cell, IFigure } from './types';
import { CONSTANTS } from './constants';

const { BOARD_SIZE } = CONSTANTS;

export class FigureKing implements IFigure {
    getCellsToMove(currentCell: Cell): Cell[] {
        const result: Cell[] = [];
        const { col, row } = currentCell;

        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (
                    i > -1 && j > -1 &&
                    i < BOARD_SIZE && j < BOARD_SIZE &&
                    !(i === col && j === row)
                ) {
                    result.push({ row: i, col: j });
                }
            }
        }

        return result;
    }
}

export class FigureQueen implements IFigure {
    getCellsToMove(currentCell: Cell): Cell[] {
        const result: Cell[] = [];
        const { col, row } = currentCell;

        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (
                    (
                        (i - j === row - col) || (i + j === col + row) ||
                        (i === row) || (j === col)
                    ) && !(i === row && j === col)
                ) {
                    result.push({ row: i, col: j});
                }
            }
        }

        return result;
    }
}

export class FigureRook implements IFigure {
    getCellsToMove(currentCell: Cell): Cell[] {
        const result: Cell[] = [];
        const { col, row } = currentCell;

        for (let i = 0; i < BOARD_SIZE; i++) {
            if (i !== col) {
                result.push({ row, col: i });
            }
        }

        for (let i = 0; i < BOARD_SIZE; i++) {
            if (i !== row) {
                result.push({ row: i, col });
            }
        }

        return result;
    }
}

export class FigureBishop implements IFigure {
    getCellsToMove(currentCell: Cell): Cell[] {
        const result: Cell[] = [];
        const { col, row } = currentCell;

        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (
                    ((i - j === row - col) || (i + j === col + row)) &&
                    !(i === row && j === col)
                ) {
                    result.push({ row: i, col: j});
                }
            }
        }

        return result;
    }
}

export class FigureKnight implements IFigure {
    getCellsToMove(currentCell: Cell): Cell[] {
        const result: Cell[] = [];
        const { col, row } = currentCell;

        const left = Math.max(col - 2, 0);
        const top = Math.max(row - 2, 0);
        const right = Math.min(col + 2, BOARD_SIZE - 1);
        const bottom = Math.min(row + 2, BOARD_SIZE - 1);

        for (let i = top; i <= bottom; i++) {
            for (let j = left; j <= right; j++) {
                if (Math.abs(i - row) + Math.abs(j - col) === 3) {
                    result.push({ row: i, col: j});
                }
            }
        }

        return result;
    }
}