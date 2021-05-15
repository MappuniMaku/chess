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

}