import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { GamePage, LoginPage, MainPage } from "./pages";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
