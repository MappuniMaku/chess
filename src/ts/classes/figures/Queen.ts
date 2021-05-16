import { FigureType, IFigure, MovesList } from '../../types';
import { Figure, FigureProps } from './Figure';
import { mergePossibleMoves } from '../../utils';

export class Queen extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.Queen,
        });
    }

    getPossibleMoves(): MovesList {
        let result: MovesList = {
            cellsToMove: [],
            cellsToAttack: [],
        };

        for (let col = -1; col <= 1; col++) {
            for (let row = -1; row <= 1; row++) {
                result = mergePossibleMoves(result, this.getMovesRay(row, col));
            }
        }

        return result;
    }
}