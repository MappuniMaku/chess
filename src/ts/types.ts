export type Cell = {
    column: number,
    row: number,
}

export interface FigureInterface {
    place: Cell,
    getCellsToMove(): Cell[],
}