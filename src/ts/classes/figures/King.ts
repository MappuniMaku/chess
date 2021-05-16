import { Cell, FigureType, IFigure, MovesList } from '../../types';
import { Figure, FigureProps } from './Figure';

export class King extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.King,
        });
    }

    getPossibleMoves(): MovesList {
        const cellsToMove: Cell[] = [];
        const cellsToAttack: Cell[] = [];
        const { col, row } = this.cell;

        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                const cell = { row: i, col: j };
                if (this.board.checkCellExisting(cell)) {
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