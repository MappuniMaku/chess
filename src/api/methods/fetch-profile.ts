import { ISendRequestOptions } from "api";
import { IProfile } from "types";

export type IFetchProfileResponse = IProfile;

export const fetchProfileOptions: ISendRequestOptions = {
  method: "GET",
  path: "/profile",
};
