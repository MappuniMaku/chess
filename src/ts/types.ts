export type Cell = {
    col: number,
    row: number,
}

export interface FigureInterface {
    place: Cell,
    getCellsToMove(): Cell[],
}