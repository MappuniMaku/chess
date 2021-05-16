import { FigureType, IFigure, MovesList } from '../../types';
import { Figure, FigureProps } from './Figure';
import { mergePossibleMoves } from '../../utils';

export class Bishop extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.Bishop,
        });
    }

    getPossibleMoves(): MovesList {
        return mergePossibleMoves(
            this.getMovesRay(-1, -1),
            this.getMovesRay(-1, 1),
            this.getMovesRay(1, -1),
            this.getMovesRay(1, 1)
        );
    }
}