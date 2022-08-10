import React, { FC } from "react";

import { IUser } from "types";
import { Preloader } from "components";

import useStyles from "./PlayersList.styles";

interface IPlayersListProps {
  items: IUser[];
  isLoading: boolean;
}

export const PlayersList: FC<IPlayersListProps> = ({ items, isLoading }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span>Имя пользователя</span>
        <span>Рейтинг</span>
      </div>
      {!isLoading ? (
        <ul className={classes.list}>
          {items.map((i) => {
            const { username, rating } = i;
            return (
              <li key={username} className={classes.listItem}>
                <span>{username}</span>
                <span>{rating}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={classes.loader}>
          <Preloader size={40} />
        </div>
      )}
    </div>
  );
};
