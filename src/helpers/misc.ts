import { IGame, IPlayer, IUser } from '@/types';

export const clearCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const pickPropsFromObj = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {} as Pick<T, K>);

export const getCurrentPlayerFromGame = (
  game: IGame | undefined,
  user: IUser | undefined,
): IPlayer | undefined => {
  if (user === undefined || game === undefined) {
    return undefined;
  }
  return game.black.user.username === user.username
    ? game.black
    : game.white.user.username === user.username
    ? game.white
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
