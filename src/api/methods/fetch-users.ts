import { ISendRequestOptions } from "api/types";
import { IUser } from "types";

export type IFetchUsersResponse = IUser[];

export const fetchUsersOptions: ISendRequestOptions = {
  method: "GET",
  path: "/users",
};
