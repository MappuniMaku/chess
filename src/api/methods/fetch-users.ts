import { IPaginatedResponse, ISendRequestOptions } from "api/types";
import { IUser } from "types";

export type IFetchUsersResponse = IPaginatedResponse<IUser>;

export const fetchUsersOptions: ISendRequestOptions = {
  method: "GET",
  path: "/users",
};
