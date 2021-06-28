import { Board } from './Board';

export class App {
    $el: HTMLElement;
    board: Board;

    constructor($el: HTMLElement) {
        this.$el = $el;
        this.board = new Board($el);
        this.init();
    }

    init(): void {
        console.log(this.board);
    }
}
