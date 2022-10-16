import { ISendRequestOptions } from 'api';

export interface IFetchLoginBodyRequest {
  username: string;
  password: string;
}

export interface IFetchLoginResponse {
  access_token: string;
}

export const fetchLoginOptions: ISendRequestOptions = {
  method: 'POST',
  path: '/auth/login',
};
