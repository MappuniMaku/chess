import { Cell, FigureType, IFigure } from '../../types';
import { Figure, FigureProps } from './Figure';
import { CONSTANTS } from '../../constants';

const { BOARD_SIZE } = CONSTANTS;

export class Queen extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.Queen,
        });
    }

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