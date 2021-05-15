import { Cell, FigureType, IFigure } from '../../types';
import { Figure, FigureProps } from './Figure';
import { CONSTANTS } from '../../constants';

const { BOARD_SIZE } = CONSTANTS;

export class Knight extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.Knight,
        });
    }

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