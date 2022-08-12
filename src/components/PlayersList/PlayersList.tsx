import React, { FC } from "react";

import { IUser, IUsersFilters } from "types";
import { Preloader } from "components";
import { HeadingButton } from "./components";

import useStyles from "./PlayersList.styles";

interface IPlayersListProps {
  items: IUser[];
  filters: IUsersFilters;
  isLoading: boolean;
  onFiltersChange: (filters: IUsersFilters) => void;
}

export const PlayersList: FC<IPlayersListProps> = ({
  items,
  filters,
  isLoading,
  onFiltersChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <HeadingButton
          heading="Имя пользователя"
          filterKey="username"
          filters={filters}
          isDisabled={isLoading}
          onFiltersChange={onFiltersChange}
        />
        <HeadingButton
          heading="Рейтинг"
          filterKey="rating"
          filters={filters}
          isDisabled={isLoading}
          onFiltersChange={onFiltersChange}
        />
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
