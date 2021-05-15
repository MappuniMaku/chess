import { Cell, FigureType, IFigure, PlayerColor } from '../../types';
import { Figure, FigureProps } from './Figure';
import { CONSTANTS } from '../../constants';

const { BOARD_SIZE } = CONSTANTS;

export class Pawn extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.Pawn,
        });
    }

    getCellsToMove(currentCell: Cell): Cell[] {
        const result: Cell[] = [];
        const { col, row } = currentCell;

        result.push({ row: row + (this.color === PlayerColor.Black ? 1 : -1), col });

        return result;
    }
}