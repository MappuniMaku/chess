import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { fetchUser } from 'store/slices';
import { GamePage, LoginPage, MainPage, PlayersListPage, SignupPage } from 'pages';
import { useAppDispatch, useWebSockets } from 'hooks';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  useWebSockets();

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
