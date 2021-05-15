import { Cell, MovementResult } from "./types";

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

export function mergeMovementResults(...results: MovementResult[]): MovementResult {
    const cellsToMove: Cell[] = [];
    const cellsToAttack: Cell[] = [];

    results.forEach(movement => {
        cellsToMove.push(...movement.cellsToMove);
        cellsToAttack.push(...movement.cellsToAttack);
    });

    return { cellsToMove, cellsToAttack };
}

export function removeClassesFromElements(container: HTMLElement, className: string): void {
    container.querySelectorAll(`.${className}`).forEach(($el) => {
        $el.classList.remove(className);
    });
}