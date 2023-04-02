import {
  ICutLinesIfNecessaryFunction,
  IGetProtectedPiecesCellsFromIdsFunction,
  IGetProtectedPiecesCellsFromLinesFunction,
  IPiecePosition,
  IRemoveCellsIfNecessaryFunction,
} from '@/types';
import { PieceType } from '../../../enums';

export const getCellIdFromPosition = (position: IPiecePosition): number => {
  const { row, col } = position;
  return (row - 1) * 8 + col - 1;
};

export const getPositionFromCellId = (cellId: number): IPiecePosition => ({
  row: Math.ceil((cellId + 1) / 8),
  col: (cellId % 8) + 1,
});

export const cutLinesIfNecessary: ICutLinesIfNecessaryFunction = ({ lines, selectedPiece }) => {
  const { color: selectedPieceColor, pieces } = selectedPiece;
  const result: number[] = [];
  lines.forEach((line) => {
    for (const id of line) {
      const piece = pieces.find((item) => item.cellId === id);
      const { color } = piece ?? {};
      if (piece === undefined || (piece.type === PieceType.King && selectedPieceColor !== color)) {
        result.push(id);
        continue;
      }
      if (selectedPieceColor !== color) {
        result.push(id);
      }
      break;
    }
  });
  return result;
};

export const removeCellsIfNecessary: IRemoveCellsIfNecessaryFunction = ({ ids, selectedPiece }) => {
  const { color: selectedPieceColor, pieces } = selectedPiece;
  const result: number[] = [];
  ids.forEach((id) => {
    const piece = pieces.find((item) => item.cellId === id);
    if (piece === undefined) {
      result.push(id);
      return;
    }
    const { color } = piece;
    if (selectedPieceColor !== color) {
      result.push(id);
    }
  });
  return result;
};

export const getTopLine = (position: IPiecePosition): number[] => {
  const { row, col } = position;
  let rowVar = row;
  const result: number[] = [];
  while (rowVar > 1) {
    rowVar--;
    result.push(getCellIdFromPosition({ row: rowVar, col }));
  }
  return result;
};

export const getBottomLine = (position: IPiecePosition): number[] => {
  const { row, col } = position;
  let rowVar = row;
  const result: number[] = [];
  while (rowVar < 8) {
    rowVar++;
    result.push(getCellIdFromPosition({ row: rowVar, col }));
  }
  return result;
};

export const getLeftLine = (position: IPiecePosition): number[] => {
  const { row, col } = position;
  let colVar = col;
  const result: number[] = [];
  while (colVar > 1) {
    colVar--;
    result.push(getCellIdFromPosition({ row, col: colVar }));
  }
  return result;
};

export const getRightLine = (position: IPiecePosition): number[] => {
  const { row, col } = position;
  let colVar = col;
  const result: number[] = [];
  while (colVar < 8) {
    colVar++;
    result.push(getCellIdFromPosition({ row, col: colVar }));
  }
  return result;
};

export const getTopLeftDiagonal = (position: IPiecePosition): number[] => {
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

export const getTopRightDiagonal = (position: IPiecePosition): number[] => {
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

export const getBottomLeftDiagonal = (position: IPiecePosition): number[] => {
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

export const getBottomRightDiagonal = (position: IPiecePosition): number[] => {
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

export const removeInvalidPositions = (positions: IPiecePosition[]): IPiecePosition[] =>
  positions.filter((item) => item.row >= 1 && item.row <= 8 && item.col >= 1 && item.col <= 8);

export const getProtectedPiecesCellsFromLines: IGetProtectedPiecesCellsFromLinesFunction = ({
  lines,
  selectedPiece,
}) => {
  const { color: selectedPieceColor, pieces } = selectedPiece;
  const result: number[] = [];
  lines.forEach((line) => {
    for (const id of line) {
      const piece = pieces.find((item) => item.cellId === id);
      if (piece === undefined) {
        continue;
      }
      const { color } = piece;
      if (selectedPieceColor === color) {
        result.push(id);
      }
      break;
    }
  });
  return result;
};

export const getProtectedPiecesCellsFromIds: IGetProtectedPiecesCellsFromIdsFunction = ({
  ids,
  selectedPiece,
}) => {
  const { color: selectedPieceColor, pieces } = selectedPiece;
  const result: number[] = [];
  for (const id of ids) {
    const piece = pieces.find((item) => item.cellId === id);
    if (piece === undefined) {
      continue;
    }
    const { color } = piece;
    if (selectedPieceColor === color) {
      result.push(id);
    }
    break;
  }
  return result;
};
