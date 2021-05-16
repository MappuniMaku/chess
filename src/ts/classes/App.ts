import {FigureType, IFigure, ObserverEvent, PlayerColor} from '../types';
import { Board } from './Board';
import { Player } from './Player';
import { CONSTANTS } from '../constants';
import { observer } from './Observer';

const { BOARD_SIZE } = CONSTANTS;

type AppParams = {
    root: HTMLElement,
}

export class App {
    board: Board;
    currentPlayer: Player | null = null;
    players: Record<PlayerColor, Player>;
    $root: HTMLElement;

    constructor(props: AppParams) {
        this.$root = props.root;
        this.board = new Board({ root: this.$root });
        this.players = {
            [PlayerColor.White]: new Player({ color: PlayerColor.White, board: this.board }),
            [PlayerColor.Black]: new Player( { color: PlayerColor.Black, board: this.board }),
        };
        this.createFiguresForPlayer(this.players[PlayerColor.Black]);
        this.createFiguresForPlayer(this.players[PlayerColor.White]);
        this.subscribeEvents();
        this.start();
    }

    subscribeEvents(): void {
        observer.subscribe(ObserverEvent.FigureMoved, this.onFigureMoved.bind(this));
        observer.subscribe(ObserverEvent.FigureRemoved, this.onFigureRemoved.bind(this));
    }

    onFigureMoved(): void {
        this.changePlayer();
    }

    onFigureRemoved(figure: IFigure): void {
        this.players[figure.color].removeFigure(figure);
    }

    createFiguresForPlayer(player: Player): void {
        const { color } = player;
        const isColorBlack = color === PlayerColor.Black;

        let currentRow = isColorBlack ? 0 : BOARD_SIZE - 1;
        const figuresList = [ FigureType.Rook, FigureType.Knight, FigureType.Bishop, FigureType.Queen, FigureType.King, FigureType.Bishop, FigureType.Knight, FigureType.Rook ];

        for (let i = 0; i < BOARD_SIZE; i++) {
            player.addFigure(this.board.createFigure(figuresList[i], color, { row: currentRow, col: i }));
        }

        currentRow += isColorBlack ? 1 : -1;
        for (let i = 0; i < BOARD_SIZE; i++) {
            player.addFigure(this.board.createFigure(FigureType.Pawn, color, { row: currentRow, col: i }));
        }
    }

    start():void {
        this.currentPlayer = this.players[PlayerColor.White];
        this.currentPlayer.startTurn();
    }

    changePlayer(): void {
        this.currentPlayer?.endTurn();

        if (this.currentPlayer?.color === PlayerColor.White) {
            this.currentPlayer = this.players[PlayerColor.Black];
        } else {
            this.currentPlayer = this.players[PlayerColor.White];
        }

        this.currentPlayer.startTurn();
    }
}