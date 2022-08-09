import { ISendRequestOptions } from "api/types";
import { IUser } from "types";

export type IFetchUserResponse = IUser;

export const fetchUserOptions: ISendRequestOptions = {
  method: "GET",
  path: "/users/:username",
};
