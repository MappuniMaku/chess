import { IGame, IGameHistory, IPlayer, IPlayerResult, IUser } from '@/types';
import { GameResult, PieceColor } from '@/enums';

export const clearCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const isArrayNotEmpty = <T>(array: T[] | null | undefined): array is T[] =>
  Array.isArray(array) && array.length > 0;

export const pickPropsFromObj = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {} as Pick<T, K>);

export const getCurrentPlayerFromGame = (
  game: IGame | undefined,
  user: IUser | undefined,
): (IPlayer & { color: PieceColor }) | undefined => {
  if (user === undefined || game === undefined) {
    return undefined;
  }
  return game.black.user.username === user.username
    ? { ...game.black, color: PieceColor.Black }
    : game.white.user.username === user.username
    ? { ...game.white, color: PieceColor.White }
    : undefined;
};

export const getOpponentFromGame = (
  game: IGame | undefined,
  user: IUser | undefined,
): IPlayer | undefined => {
  if (user === undefined || game === undefined) {
    return undefined;
  }
  return game.black.user.username === user.username
    ? game.white
    : game.white.user.username === user.username
    ? game.black
    : undefined;
};

export const getResultFromGameHistory = (
  { white, result }: IGameHistory,
  user: IUser,
): { text: string; result: IPlayerResult } => {
  const userColor = user.username === white ? PieceColor.White : PieceColor.Black;
  const resultsMap: Record<PieceColor, Record<GameResult, IPlayerResult>> = {
    [PieceColor.White]: {
      [GameResult.WhiteWin]: 'win',
      [GameResult.BlackWin]: 'loss',
      [GameResult.Draw]: 'draw',
    },
    [PieceColor.Black]: {
      [GameResult.WhiteWin]: 'loss',
      [GameResult.BlackWin]: 'win',
      [GameResult.Draw]: 'draw',
    },
  };

  const playerResult = resultsMap[userColor][result];
  const resultTextMap: Record<IPlayerResult, string> = {
    win: 'Победа',
    loss: 'Поражение',
    draw: 'Ничья',
  };
  return {
    text: resultTextMap[playerResult],
    result: playerResult,
  };
};

export const getRatingChangeFromGameHistory = (
  { white, ratingChange }: IGameHistory,
  user: IUser,
): { change: number; text: string } => {
  const isUserWhite = white === user.username;
  const change = ratingChange[isUserWhite ? 'white' : 'black'];
  return {
    change,
    text: `${change > 0 ? '+' : ''}${change} ПТС`,
  };
};
