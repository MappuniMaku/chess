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

export type MovesList = {
    cellsToMove: Cell[],
    cellsToAttack: Cell[],
}

export interface IFigure {
    $el: HTMLElement | null,
    cell: Cell;
    color: PlayerColor,
    type: FigureType,
    isOnStartPosition: boolean,

    showPossibleMoves(): void,
    getPossibleMoves(): MovesList,
    listenPlayerCommands(): void,
    stopListenPlayerCommands(): void,
    moveTo(cell: Cell): void,
    getMovesRay(rowOffset: number, colOffset: number): MovesList,
}

export type BoardCell = {
    $cell: HTMLElement,
    figure: IFigure | null,
}

// eslint-disable-next-line no-shadow
export enum ObserverEvent {
    FigureSelected = 'figure_selected',
    FigureMoved = 'figure_moved',
    FigureRemoved = 'figure_removed',
}