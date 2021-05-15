import { FigureType, IFigure, MovementResult } from '../../types';
import { Figure, FigureProps } from './Figure';
import { mergeMovementResults } from "../../utils";

export class Queen extends Figure implements IFigure {
    constructor(props: Omit<FigureProps, 'type'>) {
        super({
            ...props,
            type: FigureType.Queen,
        });
    }

    getPossibleMoves(): MovementResult {
        let result: MovementResult = {
            cellsToMove: [],
            cellsToAttack: [],
        };

        for (let col = -1; col <= 1; col++) {
            for (let row = -1; row <= 1; row++) {
                result = mergeMovementResults(result, this.getMovementRay(row, col));
            }
        }

        return result;
    }
}