// @ts-nocheck

import { PieceColor, PieceType } from 'enums';
import bishopBlack from '../images/bishop-black.png';
import bishopWhite from '../images/bishop-white.png';
import kingBlack from '../images/king-black.png';
import kingWhite from '../images/king-white.png';
import knightBlack from '../images/knight-black.png';
import knightWhite from '../images/knight-white.png';
import pawnBlack from '../images/pawn-black.png';
import pawnWhite from '../images/pawn-white.png';
import queenBlack from '../images/queen-black.png';
import queenWhite from '../images/queen-white.png';
import rookBlack from '../images/rook-black.png';
import rookWhite from '../images/rook-white.png';

const pieceNameEnum: Record<PieceColor, Record<PieceType, any>> = {
  [PieceColor.Black]: {
    [PieceType.Bishop]: bishopBlack,
    [PieceType.King]: kingBlack,
    [PieceType.Knight]: knightBlack,
    [PieceType.Pawn]: pawnBlack,
    [PieceType.Queen]: queenBlack,
    [PieceType.Rook]: rookBlack,
  },
  [PieceColor.White]: {
    [PieceType.Bishop]: bishopWhite,
    [PieceType.King]: kingWhite,
    [PieceType.Knight]: knightWhite,
    [PieceType.Pawn]: pawnWhite,
    [PieceType.Queen]: queenWhite,
    [PieceType.Rook]: rookWhite,
  },
};

export const setPieceElementProperties = (
  $el: HTMLImageElement,
  pieceName: PieceType,
  color: PieceColor,
): void => {
  $el.src = pieceNameEnum[color][pieceName];
  $el.alt = `${color} ${pieceName}`;
};
