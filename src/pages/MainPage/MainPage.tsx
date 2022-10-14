import React, { FC } from "react";

import { Layout } from "layouts";
import { Button, Container } from "components";
import { socket, useAppSelector } from "hooks";
import { WsEvents } from "enums";

export const MainPage: FC = () => {
  const { value: user } = useAppSelector((state) => state.user);
  const { searchingForGameUsers } = useAppSelector(
    (state) => state.searchingForGameUsersList
  );

  const isUserSearchingForGame = searchingForGameUsers.some(
    (u) => u.username === user?.username
  );

  return (
    <Layout currentPage="main">
      <Container>
        <div>Главная</div>
        {user !== undefined && (
          <>
            {!isUserSearchingForGame ? (
              <Button onClick={() => socket.emit(WsEvents.StartSearching)}>
                Поиск игры
              </Button>
            ) : (
              <Button onClick={() => socket.emit(WsEvents.CancelSearching)}>
                Отменить поиск
              </Button>
            )}
          </>
        )}
      </Container>
    </Layout>
  );
};
