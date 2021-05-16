import {IFigure, ObserverEvent, PlayerColor} from '../types';
import { Board } from './Board';

type PlayerProps = {
    color: PlayerColor,
    board: Board,
}

export class Player {
    board: Board;
    color: PlayerColor;
    figures: IFigure[] = [];

    constructor(props: PlayerProps) {
        this.color = props.color;
        this.board = props.board;
    }

    addFigure(figure: IFigure): void {
        this.figures.push(figure);
    }

    removeFigure(figure: IFigure): void {
        this.figures = this.figures.filter(current => ( current !== figure ));
    }

    startTurn(): void {
        this.figures.forEach(figure => {
            figure.listenPlayerCommands();
        })
    }

    endTurn(): void {
        this.figures.forEach(figure => {
            figure.stopListenPlayerCommands();
        })
    }
}