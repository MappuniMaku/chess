import { ISendRequestOptions } from "api/types";

export interface IFetchProfileResponse {
  username: string;
}

export const fetchProfileOptions: ISendRequestOptions = {
  method: "GET",
  path: "/profile",
};
