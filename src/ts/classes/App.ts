import {FigureType, PlayerColor} from '../types';
import {Board} from './Board';
import {Player} from './Player';
import {CONSTANTS} from '../constants';

const { BOARD_SIZE } = CONSTANTS;

type AppParams = {
    root: HTMLElement,
}

export class App {
    board: Board;
    players: Record<PlayerColor, Player>;
    $root: HTMLElement;

    constructor(props: AppParams) {
        this.$root = props.root;
        this.players = {
            [PlayerColor.White]: new Player({ color: PlayerColor.White }),
            [PlayerColor.Black]: new Player( { color: PlayerColor.Black }),
        };
        this.board = new Board({ root: this.$root });
        this.createFiguresForPlayer(this.players[PlayerColor.Black]);
        this.createFiguresForPlayer(this.players[PlayerColor.White]);
    }

    createFiguresForPlayer(player: Player): void {
        const { color } = player;
        const isColorBlack = color === PlayerColor.Black;

        let currentRow = isColorBlack ? 0 : BOARD_SIZE - 1;
        const figuresList = [ FigureType.Rook, FigureType.Knight, FigureType.Bishop, FigureType.Queen, FigureType.King, FigureType.Bishop, FigureType.Knight, FigureType.Rook ];

        for (let i = 0; i < BOARD_SIZE; i++) {
            this.board.createFigure(figuresList[i], color, { row: currentRow, col: i });
        }

        currentRow += isColorBlack ? 1 : -1;
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.board.createFigure(FigureType.Pawn, color, { row: currentRow, col: i });
        }
    }
}