import { PiecePosition } from "../types";

export const getCellIdFromPosition = (position: PiecePosition): number => {
  const { row, col } = position;
  return (row - 1) * 8 + col - 1;
};

export const getTopLine = (position: PiecePosition): number[] => {
  const { row, col } = position;
  let rowVar = row;
  const result: number[] = [];
  while (rowVar > 1) {
    rowVar--;
    result.push(getCellIdFromPosition({ row: rowVar, col }));
  }
  return result;
};

export const getBottomLine = (position: PiecePosition): number[] => {
  const { row, col } = position;
  let rowVar = row;
  const result: number[] = [];
  while (rowVar < 8) {
    rowVar++;
    result.push(getCellIdFromPosition({ row: rowVar, col }));
  }
  return result;
};

export const getLeftLine = (position: PiecePosition): number[] => {
  const { row, col } = position;
  let colVar = col;
  const result: number[] = [];
  while (colVar > 1) {
    colVar--;
    result.push(getCellIdFromPosition({ row, col: colVar }));
  }
  return result;
};

export const getRightLine = (position: PiecePosition): number[] => {
  const { row, col } = position;
  let colVar = col;
  const result: number[] = [];
  while (colVar < 8) {
    colVar++;
    result.push(getCellIdFromPosition({ row, col: colVar }));
  }
  return result;
};

export const getLinesCellsIdsFromPosition = (
  position: PiecePosition
): number[] => [
  ...getTopLine(position),
  ...getBottomLine(position),
  ...getLeftLine(position),
  ...getRightLine(position),
];

export const getTopLeftDiagonal = (position: PiecePosition): number[] => {
  const { row, col } = position;
  let rowVar = row;
  let colVar = col;
  const result: number[] = [];
  while (rowVar > 1 && colVar > 1) {
    rowVar--;
    colVar--;
    result.push(getCellIdFromPosition({ row: rowVar, col: colVar }));
  }
  return result;
};

export const getTopRightDiagonal = (position: PiecePosition): number[] => {
  const { row, col } = position;
  let rowVar = row;
  let colVar = col;
  const result: number[] = [];
  while (rowVar > 1 && colVar < 8) {
    rowVar--;
    colVar++;
    result.push(getCellIdFromPosition({ row: rowVar, col: colVar }));
  }
  return result;
};

export const getBottomLeftDiagonal = (position: PiecePosition): number[] => {
  const { row, col } = position;
  let rowVar = row;
  let colVar = col;
  const result: number[] = [];
  while (rowVar < 8 && colVar > 1) {
    rowVar++;
    colVar--;
    result.push(getCellIdFromPosition({ row: rowVar, col: colVar }));
  }
  return result;
};

export const getBottomRightDiagonal = (position: PiecePosition): number[] => {
  const { row, col } = position;
  let rowVar = row;
  let colVar = col;
  const result: number[] = [];
  while (rowVar < 8 && colVar < 8) {
    rowVar++;
    colVar++;
    result.push(getCellIdFromPosition({ row: rowVar, col: colVar }));
  }
  return result;
};

export const getDiagonalsCellsIdsFromPosition = (
  position: PiecePosition
): number[] => [
  ...getTopLeftDiagonal(position),
  ...getTopRightDiagonal(position),
  ...getBottomLeftDiagonal(position),
  ...getBottomRightDiagonal(position),
];
