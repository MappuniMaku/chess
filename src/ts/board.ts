import {AppParams, Cell} from './types';
import { CONSTANTS } from './constants';

const { BOARD_SIZE, CELL_SIZE, LETTERS_START_CODE } = CONSTANTS;
/*
export class Board {
    $el: HTMLElement | null = null;

    //constructor(props: AppParams) {

        //this.$root = props.root;
        //this.createBoard();
    //}

    initBoard() {

    }

    convertCoordsToCell(x: number, y: number): Cell | null {
        if (
            x < CELL_SIZE || y < CELL_SIZE ||
            x > CELL_SIZE * (BOARD_SIZE + 1) || y > CELL_SIZE * (BOARD_SIZE + 1)
        ) return null;

        // remove headings offsets
        y -= CELL_SIZE;
        x -= CELL_SIZE;

        return { row: Math.floor(y / CELL_SIZE), col: Math.floor(x / CELL_SIZE) };
    }
}*/