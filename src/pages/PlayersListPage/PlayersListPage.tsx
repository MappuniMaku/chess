import React, { FC, useCallback, useEffect, useState } from "react";
import { debounce } from "ts-debounce";

import { IUsersFilters, IUsersListData } from "types";
import { Layout } from "layouts";
import { Container, Input, PlayersList } from "components";
import { api } from "api";

import useStyles from "./PlayersListPage.styles";

const PLAYERS_LIST_PAGE_SIZE = 30;

export const PlayersListPage: FC = () => {
  const classes = useStyles();

  const [playersData, setPlayersData] = useState<IUsersListData>();
  const [filters, setFilters] = useState<IUsersFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnScroll, setIsLoadingOnScroll] = useState(false);

  const fetchPlayers = async (
    currentPage: number,
    filtersValues?: IUsersFilters
  ) => {
    if (currentPage > 1) {
      setIsLoadingOnScroll(true);
    } else {
      setIsLoading(true);
    }
    try {
      const response = await api.fetchUsers({
        params: {
          ...filtersValues,
          page: currentPage,
          pageSize: PLAYERS_LIST_PAGE_SIZE,
        },
      });
      setPlayersData({
        ...response,
        items:
          currentPage > 1
            ? [...(playersData?.items ?? []), ...response.items]
            : response.items,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsLoadingOnScroll(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchPlayers = useCallback(debounce(fetchPlayers, 500), []);

  const handleFiltersChange = (filtersValues: IUsersFilters) => {
    setFilters({ ...filtersValues, page: 1 });
    debouncedFetchPlayers(1, filtersValues);
  };

  const handleScrollLoad = (page: number) => {
    setFilters({ ...filters, page });
    fetchPlayers(page, filters);
  };

  useEffect(() => {
    fetchPlayers(1, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout currentPage="playersList">
      <Container>
        <div className={classes.usernameInput}>
          <Input
            value={filters.username ?? ""}
            label="Имя пользователя"
            isDisabled={isLoading || isLoadingOnScroll}
            onChange={(v) =>
              handleFiltersChange({
                ...filters,
                username: v,
              })
            }
          />
        </div>
        <div className={classes.playersList}>
          <PlayersList
            data={playersData}
            filters={filters}
            isLoading={isLoading}
            isLoadingOnScroll={isLoadingOnScroll}
            onFiltersChange={handleFiltersChange}
            onScrollLoad={handleScrollLoad}
          />
        </div>
      </Container>
    </Layout>
  );
};
