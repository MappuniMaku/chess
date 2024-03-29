import { IPaginatedResponse, IPaginationRequest } from '@/api';

export interface IUser {
  username: string;
  rating: number;
  initialRating: number;
  createdAt: string;
}

export type IProfile = Pick<IUser, 'username'>;

export type IUsersFilters = IPaginationRequest & {
  username?: string;
  sort?: 'username_asc' | 'username_desc' | 'rating_asc' | 'rating_desc';
};

export type IUsersListData = IPaginatedResponse<IUser>;
