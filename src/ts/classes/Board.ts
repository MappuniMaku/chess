import { Colors } from './types';
import { Cell } from './Cell';
import { isEven } from './utils';

export class Board {
    $el: HTMLElement;

    constructor($el: HTMLElement) {
        this.$el = $el;
        this.render();
    }

    render(): void {
        const cellsArr = new Array(64)
            .fill('')
            .map((_, index) => {
                const row = Math.floor(index / 8) + 1;
                const col = (index % 8) + 1;
                let color: Colors;

                if (isEven(row)) {
                    color = isEven(col) ? Colors.Light : Colors.Dark;
                } else {
                    color = isEven(col) ? Colors.Dark : Colors.Light;
                }

                return {
                    id: index,
                    row,
                    col,
                    color,
                };
            })
            .map(item => new Cell(item).render());

        const numbersArr = new Array(8).fill('').map((_, index) => index + 1);
        const letters = numbersArr.map(item => (
            `<div class="Chess__letter">${String.fromCharCode(item + 64)}</div>`
        ));
        const numbers = numbersArr.map(item => (
            `<div class="Chess__number">${item}</div>`
        ));

        const html = `
            <div class="Chess__board">
                <div class="Chess__letters">
                    ${letters.join('')}
                </div>
                
                <div class="Chess__numbers">
                    ${numbers.join('')}
                </div>
                
                <div class="Chess__cellsWrapper">
                    ${cellsArr.join('')}
                </div>
            </div>
        `;
        this.$el.insertAdjacentHTML('beforeend', html);
    }
}
