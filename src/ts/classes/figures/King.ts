import { Cell, FigureType, IFigure } from '../../types';
import { Figure, FigureProps } from './Figure';
import { CONSTANTS } from '../../constants';

const { BOARD_SIZE } = CONSTANTS;

export class King extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.King,
        });
    }

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