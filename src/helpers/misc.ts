import { IMove } from "../types";
import {
  CastlingType,
  COLUMN_NAMES,
  PieceType,
  SHORT_PIECES_NAMES_DICTIONARY,
} from "../enums";

const reverseRows = Array.from({ length: 10 })
  .fill("")
  .map((_, i) => i)
  .reverse();

export const getMoveString = (move: IMove): string => {
  const {
    piece,
    initialPosition,
    finalPosition,
    wasCaptureMade,
    castlingType,
    wasCheckMade,
    selectedPieceTypeToTransform,
  } = move;
  const { type: pieceType } = piece;
  const { row, col } = finalPosition;

  const checkState = wasCheckMade ? "+" : "";

  if (castlingType === CastlingType.Short) {
    return `0-0${checkState}`;
  }

  if (castlingType === CastlingType.Long) {
    return `0-0-0${checkState}`;
  }

  const revertedRow = reverseRows[row];
  const pieceName = SHORT_PIECES_NAMES_DICTIONARY[pieceType];
  const delimiter = wasCaptureMade ? " x " : "";
  const columnName = COLUMN_NAMES[col as keyof typeof COLUMN_NAMES];
  const initialColumnName =
    COLUMN_NAMES[initialPosition.col as keyof typeof COLUMN_NAMES];
  const transformedPieceName =
    selectedPieceTypeToTransform !== undefined
      ? ` ${SHORT_PIECES_NAMES_DICTIONARY[selectedPieceTypeToTransform]}`
      : "";

  if (pieceType !== PieceType.Pawn) {
    return `${pieceName}${delimiter}${columnName}${revertedRow}${checkState}`;
  }

  if (wasCaptureMade) {
    return `${initialColumnName}${delimiter}${columnName}${revertedRow}${transformedPieceName}${checkState}`;
  }

  return `${columnName}${revertedRow}${transformedPieceName}${checkState}`;
};
