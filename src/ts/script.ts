import {
    Cell,
    FigureInterface
} from "ts/types";

const root = document.getElementById('root');
const DESC_SIZE = 8;
const LETTERS_START_CODE = 'a'.charCodeAt(0);

abstract class Figure {
    place: Cell;

    constructor(props) {
        this.place = props.place;
    }
}

class FigureKing extends Figure implements FigureInterface {
    getCellsToMove(): Cell[] {
        return [];
    }
}

class App {
    root: HTMLElement;

    constructor(props) {
        this.root = props.root;
        this.createDesc();
    }

    createDesc() {
        const desc = this.createElement('div', 'Chess__desc');

        // create letters row
        const lettersRow = this.createElement('div', 'Chess__row');
        desc.append(lettersRow);

        // create empty cell for spacing and add it to start of letters headings
        const emptyCell = this.createElement('div', 'Chess__cell');
        lettersRow.append(emptyCell);

        for (let i = 0; i < DESC_SIZE; i++) {
            // create heading letter cells
            const letterCell = this.createElement('div', 'Chess__cell Chess__cell--heading');
            letterCell.textContent = String.fromCharCode(LETTERS_START_CODE + i);
            lettersRow.append(letterCell);

            // create row
            const row = this.createElement('div', 'Chess__row');

            // create heading number cell
            const numberCell = this.createElement('div', 'Chess__cell Chess__cell--heading');
            numberCell.textContent = String(DESC_SIZE - i);
            row.append(numberCell);

            // create main chess cells
            for (let j = 0; j < DESC_SIZE; j++) {
                const cell = this.createElement('div', 'Chess__cell Chess__cell--main');
                cell.addEventListener('click', (event) => {
                    this.onCellClick({ column: j, row: i });
                });
                row.append(cell);
            }

            row.append(numberCell.cloneNode(true));
            desc.append(row);
        }

        // add empty cell to end of letters headings
        lettersRow.append(emptyCell.cloneNode());
        desc.append(lettersRow.cloneNode(true));

        this.root.append(desc);
    }

    onCellClick(cell: Cell) {
        console.log(cell.column, cell.row);
    }

    getElement(query: string): HTMLElement | null {
        return document.querySelector(query);
    }

    createElement(tag: string, className: string = ''): HTMLElement {
        const el = document.createElement(tag);
        if (className) {
            el.className = className;
        }
        return el;
    }
}

const app = new App({ root });