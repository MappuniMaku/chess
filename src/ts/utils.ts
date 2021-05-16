import { Cell, MovesList } from './types';

export function createElement(tag: string, className = ''): HTMLElement {
    const el = document.createElement(tag);
    if (className) {
        el.className = className;
    }
    return el;
}

export function createDiv(className = ''): HTMLElement {
    return createElement('div', className);
}

export function mergePossibleMoves(...possibleMoves: MovesList[]): MovesList {
    const cellsToMove: Cell[] = [];
    const cellsToAttack: Cell[] = [];

    possibleMoves.forEach(moves => {
        cellsToMove.push(...moves.cellsToMove);
        cellsToAttack.push(...moves.cellsToAttack);
    });

    return { cellsToMove, cellsToAttack };
}

export function isEqualCells(cell1: Cell, cell2: Cell): boolean {
    return cell1.col === cell2.col && cell1.row === cell2.row;
}

export function isMovePossible(possibleMoves: MovesList, cellToMove: Cell): boolean {
    return possibleMoves.cellsToMove.some((move) => (
        isEqualCells(move, cellToMove)
    )) || possibleMoves.cellsToAttack.some((move) => (
        isEqualCells(move, cellToMove)
    ));
}

export function removeClassesFromElements(container: HTMLElement, className: string): void {
    container.querySelectorAll(`.${className}`).forEach(($el) => {
        $el.classList.remove(className);
    });
}