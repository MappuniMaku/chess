import { IBishop, IKing, IKnight, IMove, IPiece, IQueen, IRook } from 'types';
import {
  CastlingType,
  cellMovingPieces,
  COLUMN_NAMES,
  lineMovingPieces,
  PieceType,
  SHORT_PIECES_NAMES_DICTIONARY,
} from 'enums';

const reverseRows = Array.from({ length: 10 })
  .fill('')
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
    isMate,
    isStalemate,
    selectedPieceTypeToTransform,
  } = move;
  const { type: pieceType } = piece;
  const { row, col } = finalPosition;

  const checkMateState = isMate ? ' #' : isStalemate ? ' 1/2 - 1/2' : wasCheckMade ? '+' : '';

  if (castlingType === CastlingType.Short) {
    return `0-0${checkMateState}`;
  }

  if (castlingType === CastlingType.Long) {
    return `0-0-0${checkMateState}`;
  }

  const revertedRow = reverseRows[row];
  const pieceName = SHORT_PIECES_NAMES_DICTIONARY[pieceType];
  const delimiter = wasCaptureMade ? ' x ' : '';
  const columnName = COLUMN_NAMES[col as keyof typeof COLUMN_NAMES];
  const initialColumnName = COLUMN_NAMES[initialPosition.col as keyof typeof COLUMN_NAMES];
  const transformedPieceName =
    selectedPieceTypeToTransform !== undefined
      ? ` ${SHORT_PIECES_NAMES_DICTIONARY[selectedPieceTypeToTransform]}`
      : '';

  if (pieceType !== PieceType.Pawn) {
    return `${pieceName}${delimiter}${columnName}${revertedRow}${checkMateState}`;
  }

  if (wasCaptureMade) {
    return `${initialColumnName}${delimiter}${columnName}${revertedRow}${transformedPieceName}${checkMateState}`;
  }

  return `${columnName}${revertedRow}${transformedPieceName}${checkMateState}`;
};

export const isLineMovingPiece = (piece: IPiece): piece is IRook | IQueen | IBishop =>
  lineMovingPieces.includes(piece.type);

export const isCellMovingPiece = (piece: IPiece): piece is IKing | IKnight =>
  cellMovingPieces.includes(piece.type);
