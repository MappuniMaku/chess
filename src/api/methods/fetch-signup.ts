import { IPaginatedResponse, ISendRequestOptions } from 'api';
import { IUser } from 'types';

export interface IFetchSignupBodyRequest {
  username: string;
  password: string;
  rating: number;
}

export type IFetchSignupResponse = IPaginatedResponse<IUser>;

export const fetchSignupOptions: ISendRequestOptions = {
  method: 'POST',
  path: '/users',
};
