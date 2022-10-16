import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'api';
import { IUser } from 'types';

export interface IUserState {
  value?: IUser;
  isLoading: boolean;
}

const initialState: IUserState = {
  value: undefined,
  isLoading: true,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const { username } = await api.fetchProfile();
  return await api.fetchUser({ username });
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.value = undefined;
      });
  },
});

export const userReducer = userSlice.reducer;
