import { ISendRequestOptions } from '@/api';
import { IGameHistory } from '@/types';

export type IFetchMyGamesResponse = Array<IGameHistory<string>>;

export const fetchMyGamesOptions: ISendRequestOptions = {
  method: 'GET',
  path: '/games',
};
