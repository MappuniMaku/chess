import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "types";

export interface IConnectedUsersListState {
  connectedUsers: IUser[];
}

const initialState: IConnectedUsersListState = {
  connectedUsers: [],
};

export const connectedUsersListSlice = createSlice({
  name: "connectedUsersList",
  initialState,
  reducers: {
    updateConnectedUsers(state, action: PayloadAction<IUser[]>) {
      state.connectedUsers = action.payload;
    },
  },
});

export const { updateConnectedUsers } = connectedUsersListSlice.actions;

export const connectedUsersListReducer = connectedUsersListSlice.reducer;
