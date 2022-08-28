import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { fetchUser } from "store/slices";
import {
  GamePage,
  LoginPage,
  MainPage,
  PlayersListPage,
  SignupPage,
} from "pages";
import { useAppDispatch } from "./hooks";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  dispatch(fetchUser());

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/players" element={<PlayersListPage />} />
    </Routes>
  );
};
