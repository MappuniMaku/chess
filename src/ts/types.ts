export type Cell = {
    row: number,
    col: number,
}

export enum FigureType {
    King = 'king',
    Queen = 'queen',
    Rook = 'rook',
    Bishop = 'bishop',
    Knight = 'knight',
    Pawn = 'pawn',
}

export enum PlayerColor {
    White = 'white',
    Black = 'black',
}

export interface IFigure {
    $el: HTMLElement | null,
    cell: Cell;
    color: PlayerColor,
    type: FigureType,

    getCellsToMove(currentCell: Cell): Cell[],
}

export type BoardCell = {
    $cell: HTMLElement,
    figure: IFigure | null,
}

//export type FiguresList = Record<FigureType, IFigure>