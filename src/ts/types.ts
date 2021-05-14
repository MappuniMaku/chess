export type Cell = {
    row: number,
    col: number,
}

export type AppParams = {
    root: HTMLElement,
}

export interface IFigure {
    getCellsToMove(currentCell: Cell): Cell[],
}

export type BoardCell = {
    $cell: HTMLElement,
    figure: IFigure | null,
}

export enum FigureType {
    King = 'king'/*,
    Queen = 'queen',
    Rook = 'rook',
    Bishop = 'bishop',
    Knight = 'knight',
    Pawn = 'pawn',*/
}

export enum Player {
    White = 'white',
    Black = 'black',
}

export type FiguresList = Record<FigureType, IFigure>