import { createElement, isOdd } from './utils';
import {Cell, IFigure, FigureShortName, ObserverEvent} from './types';
import { CONSTANTS } from './constants';
import { observer } from './classes/Observer';

const { BOARD_SIZE, LETTERS_START_CODE } = CONSTANTS

type TurnsListParams = {
    $root: HTMLElement,
}

export class TurnsList {
    turn = 1;
    $el: HTMLElement | null = null;
    $items: HTMLElement[] = [];

    constructor(params: TurnsListParams) {
        this.createList(params.$root);
        this.subscribeEvents();
    }

    subscribeEvents(): void {
        observer.subscribe(ObserverEvent.FigureMoved, this.addTurn.bind(this));
    }

    createList($root: HTMLElement): void {
        this.$el = createElement('ul', 'Chess__turnsList');
        $root.append(this.$el);
    }

    addTurn(figure: IFigure, newPosition: Cell): void {
        if (isOdd(this.turn)) {
            const $item = createElement('li', 'Chess__turnsListItem');
            this.$items.push($item);
            this.$el?.append($item);
        }

        const $item = this.$items[this.$items.length - 1];
        $item.textContent += !isOdd(this.turn) ? ' ' : '';
        $item.textContent += FigureShortName[figure.type];
        $item.textContent += this.getCellName(newPosition);

        this.turn++;
    }

    getCellName(cell: Cell): string {
        const { row, col } = cell;
        return `${String.fromCharCode(LETTERS_START_CODE + col)}${BOARD_SIZE - row}`;
    }
}