import React, { FC } from "react";

import { Button } from "components";
import { socket, useAppSelector } from "hooks";
import { WsEvents } from "enums";

import useStyles from "./GameSearch.styles";

export const GameSearch: FC = () => {
  const classes = useStyles();

  const { value: user } = useAppSelector((state) => state.user);
  const { searchingForGameUsers } = useAppSelector(
    (state) => state.searchingForGameUsersList
  );

  const isUserSearchingForGame = searchingForGameUsers.some(
    (u) => u.username === user?.username
  );

  return (
    <div className={classes.root}>
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
  );
};
