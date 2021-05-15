import { FigureType, IFigure, MovementResult } from '../../types';
import { Figure, FigureProps } from './Figure';
import { mergeMovementResults } from '../../utils';

export class Rook extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.Rook,
        });
    }

    getPossibleMoves(): MovementResult {
        return mergeMovementResults(
            this.getMovementRay(-1),
            this.getMovementRay(1),
            this.getMovementRay(0, -1),
            this.getMovementRay(0, 1)
        );
    }
}