import { Cell, FigureType, IFigure } from '../../types';
import { Figure, FigureProps } from './Figure';
import { CONSTANTS } from '../../constants';

const { BOARD_SIZE } = CONSTANTS;

export class Rook extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.Rook,
        });
    }

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