import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types';

export interface ISearchingForGameUsersListState {
  searchingForGameUsers: IUser[];
}

const initialState: ISearchingForGameUsersListState = {
  searchingForGameUsers: [],
};

export const searchingForGameUsersListSlice = createSlice({
  name: 'searchingForGameUsersList',
  initialState,
  reducers: {
    updateSearchingForGameUsers(state, action: PayloadAction<IUser[]>) {
      state.searchingForGameUsers = action.payload;
    },
  },
});

export const { updateSearchingForGameUsers } = searchingForGameUsersListSlice.actions;

export const searchingForGameUsersListReducer = searchingForGameUsersListSlice.reducer;
