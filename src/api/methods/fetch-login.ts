import { ISendRequestOptions } from "api/types";

export interface IFetchLoginBodyRequest {
  username: string;
  password: string;
}

export interface IFetchLoginResponse {
  access_token: string;
}

export const fetchLoginOptions: ISendRequestOptions = {
  method: "POST",
  path: "/auth/login",
  shouldRedirectOnUnauthorized: false,
};
