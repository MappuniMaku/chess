import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import {
  userReducer,
  connectedUsersListReducer,
  searchingForGameUsersListReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    connectedUsersList: connectedUsersListReducer,
    searchingForGameUsersList: searchingForGameUsersListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
