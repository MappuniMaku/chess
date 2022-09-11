import React, { FC, useEffect, useRef } from "react";
import clsx from "clsx";

import { IUsersFilters, IUsersListData } from "types";
import { Preloader } from "components";
import { HeadingButton } from "./components";
import { useAppSelector } from "hooks";

import useStyles from "./PlayersList.styles";

interface IPlayersListProps {
  data?: IUsersListData;
  filters: IUsersFilters;
  isLoading: boolean;
  isLoadingOnScroll: boolean;
  onFiltersChange: (filters: IUsersFilters) => void;
  onScrollLoad: (page: number) => void;
}

export const PlayersList: FC<IPlayersListProps> = ({
  data,
  filters,
  isLoading,
  isLoadingOnScroll,
  onFiltersChange,
  onScrollLoad,
}) => {
  const classes = useStyles();

  const { connectedUsers } = useAppSelector(
    (state) => state.connectedUsersList
  );

  const { items, page, totalPages } = data ?? {};

  const listWrapperRef = useRef<HTMLDivElement>(null);
  const scrollLoaderRef = useRef<HTMLDivElement>(null);

  const isLastPage = (page ?? 1) === (totalPages ?? 0);

  useEffect(() => {
    const listWrapper = listWrapperRef.current;
    const scrollLoader = scrollLoaderRef.current;

    if (listWrapper === null || scrollLoader === null || isLoadingOnScroll) {
      return;
    }

    const options = {
      root: document,
      rootMargin: "0px",
      threshold: 0.0,
    };
    const intersectionCallback: IntersectionObserverCallback = (entries) => {
      if (!entries[0].isIntersecting) {
        return;
      }
      onScrollLoad((page ?? 1) + 1);
    };

    const observer = new IntersectionObserver(intersectionCallback, options);
    observer.observe(scrollLoader);

    return () => observer.disconnect();
  }, [isLoading, items, page, isLoadingOnScroll, onScrollLoad]);

  return (
    <div className={classes.root} ref={listWrapperRef}>
      <div className={classes.header}>
        <HeadingButton
          heading="Имя пользователя"
          filterKey="username"
          filters={filters}
          isDisabled={isLoading || isLoadingOnScroll}
          onFiltersChange={onFiltersChange}
        />
        <HeadingButton
          heading="Рейтинг"
          filterKey="rating"
          filters={filters}
          isDisabled={isLoading || isLoadingOnScroll}
          onFiltersChange={onFiltersChange}
        />
        <span>Статус</span>
      </div>
      {!isLoading ? (
        <>
          {items !== undefined && items.length > 0 ? (
            <>
              <ul className={classes.list}>
                {items.map((i) => {
                  const { username, rating } = i;
                  const isOnline =
                    connectedUsers.findIndex((u) => u.username === username) !==
                    -1;
                  return (
                    <li key={username} className={classes.listItem}>
                      <span>{username}</span>
                      <span>{rating}</span>
                      <span
                        className={clsx(
                          classes.statusBullet,
                          isOnline && classes.statusBulletOnline
                        )}
                      />
                    </li>
                  );
                })}
              </ul>
              {!isLastPage && (
                <div ref={scrollLoaderRef} className={classes.scrollLoader}>
                  <Preloader />
                </div>
              )}
            </>
          ) : (
            <div className={classes.noItemsMessage}>Ничего не найдено</div>
          )}
        </>
      ) : (
        <div className={classes.loader}>
          <Preloader size={40} />
        </div>
      )}
    </div>
  );
};
