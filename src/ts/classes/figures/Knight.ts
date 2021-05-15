import { Cell, FigureType, IFigure, MovementResult } from '../../types';
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

    getPossibleMoves(): MovementResult {
        const cellsToMove: Cell[] = [];
        const cellsToAttack: Cell[] = [];
        const { col, row } = this.cell;

        const left = Math.max(col - 2, 0);
        const top = Math.max(row - 2, 0);
        const right = Math.min(col + 2, BOARD_SIZE - 1);
        const bottom = Math.min(row + 2, BOARD_SIZE - 1);

        for (let i = top; i <= bottom; i++) {
            for (let j = left; j <= right; j++) {
                const cell = { row: i, col: j };

                if ((Math.abs(i - row) + Math.abs(j - col) === 3)) {
                    const figure = this.board.getFigureOnCell(cell);
                    if (figure !== null) {
                        if (this.isEnemyFigure(figure)) {
                            cellsToAttack.push(cell);
                        }
                    } else {
                        cellsToMove.push(cell);
                    }
                }
            }
        }

        return { cellsToMove, cellsToAttack };
    }
}