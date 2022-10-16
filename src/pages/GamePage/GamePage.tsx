import React, { FC } from "react";

import { Layout } from "layouts";
import { Button, Container, GameLauncher } from "components";
import { socket, useAppSelector } from "hooks";
import { WsEvents } from "enums";

import useStyles from "./GamePage.styles";

export const GamePage: FC = () => {
  const classes = useStyles();

  const { value: user } = useAppSelector((state) => state.user);
  const { searchingForGameUsers } = useAppSelector(
    (state) => state.searchingForGameUsersList
  );
  const { value: activeGame } = useAppSelector((state) => state.activeGame);

  const isUserSearchingForGame = searchingForGameUsers.some(
    (u) => u.username === user?.username
  );

  const hasActiveGame = activeGame !== undefined;

  return (
    <Layout currentPage="game">
      <Container>
        <div className={classes.root}>
          {user !== undefined && (
            <div className={classes.searchButtons}>
              <div>
                <Button
                  isLoading={isUserSearchingForGame}
                  onClick={() => socket.emit(WsEvents.StartSearching)}
                >
                  Поиск игры
                </Button>
              </div>
              {isUserSearchingForGame && (
                <div>
                  <Button onClick={() => socket.emit(WsEvents.CancelSearching)}>
                    Отмена
                  </Button>
                </div>
              )}
            </div>
          )}
          {hasActiveGame && <GameLauncher />}
        </div>
      </Container>
    </Layout>
  );
};
