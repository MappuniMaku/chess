import { FigureType, IFigure } from '../../types';
import { King as FigureKing } from './King';
import { Queen as FigureQueen } from './Queen';
import { Rook as FigureRook } from './Rook';
import { Bishop as FigureBishop } from './Bishop';
import { Knight as FigureKnight } from './Knight';
import { Pawn as FigurePawn } from './Pawn';

export const figures = {
    [FigureType.King]: FigureKing,
    [FigureType.Queen]: FigureQueen,
    [FigureType.Rook]: FigureRook,
    [FigureType.Bishop]: FigureBishop,
    [FigureType.Knight]: FigureKnight,
    [FigureType.Pawn]: FigurePawn,
}