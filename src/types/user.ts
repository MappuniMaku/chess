export interface IUser {
  username: string;
  rating: number;
}

export type IProfile = Pick<IUser, "username">;

export type IUsersFilters = {
  username?: string;
  sort?: "username_asc" | "username_desc" | "rating_asc" | "rating_desc";
};
