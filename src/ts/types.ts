export type Cell = {
    row: number,
    col: number,
}

// eslint-disable-next-line no-shadow
export enum FigureType {
    King = 'king',
    Queen = 'queen',
    Rook = 'rook',
    Bishop = 'bishop',
    Knight = 'knight',
    Pawn = 'pawn',
}

// eslint-disable-next-line no-shadow
export enum PlayerColor {
    White = 'white',
    Black = 'black',
}

export type MovementResult = {
    cellsToMove: Cell[],
    cellsToAttack: Cell[],
}

export interface IFigure {
    $el: HTMLElement | null,
    cell: Cell;
    color: PlayerColor,
    type: FigureType,
    isOnStartPosition: boolean,

    getPossibleMoves(): MovementResult,
    moveTo(cell: Cell): void,
    getMovementRay(rowOffset: number, colOffset: number): MovementResult,
}

export type BoardCell = {
    $cell: HTMLElement,
    figure: IFigure | null,
}