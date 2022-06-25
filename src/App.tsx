import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { GamePage, MainPage } from "./pages";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
};
