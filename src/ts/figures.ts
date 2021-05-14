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
                    i > 0 && j > 0 &&
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