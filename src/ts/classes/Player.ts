import { IFigure, PlayerColor } from '../types';

type PlayerProps = {
    color: PlayerColor,
}

export class Player {
    color: PlayerColor;
    figures: IFigure[] = [];

    constructor(props: PlayerProps) {
        this.color = props.color;
    }

    giveFigure(figure: IFigure) {
        this.figures.push(figure);
    }
}