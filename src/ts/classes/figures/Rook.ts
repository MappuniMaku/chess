import { FigureType, IFigure, MovesList } from '../../types';
import { Figure, FigureProps } from './Figure';
import { mergePossibleMoves } from '../../utils';

export class Rook extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.Rook,
        });
    }

    getPossibleMoves(): MovesList {
        return mergePossibleMoves(
            this.getMovesRay(-1),
            this.getMovesRay(1),
            this.getMovesRay(0, -1),
            this.getMovesRay(0, 1)
        );
    }
}