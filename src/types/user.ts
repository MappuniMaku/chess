export interface IUser {
  username: string;
  rating: number;
}

export type IProfile = Pick<IUser, "username">;
