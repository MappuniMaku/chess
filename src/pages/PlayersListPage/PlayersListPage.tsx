import React, { FC, useCallback, useEffect, useState } from "react";
import { debounce } from "ts-debounce";

import { IUser, IUsersFilters } from "types";
import { Layout } from "layouts";
import { Container, Input, PlayersList } from "components";
import { api } from "api";

import useStyles from "./PlayersListPage.styles";

export const PlayersListPage: FC = () => {
  const classes = useStyles();

  const [players, setPlayers] = useState<IUser[]>([]);
  const [filters, setFilters] = useState<IUsersFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlayers = async (filtersValues?: IUsersFilters) => {
    setIsLoading(true);
    try {
      const response = await api.fetchUsers({ params: filtersValues });
      setPlayers(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchPlayers = useCallback(debounce(fetchPlayers, 500), []);

  const handleFiltersChange = (filtersValues: IUsersFilters) => {
    setFilters(filtersValues);
    debouncedFetchPlayers(filtersValues);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <Layout currentPage="playersList">
      <Container>
        <div className={classes.usernameInput}>
          <Input
            value={filters.username ?? ""}
            label="Имя пользователя"
            isDisabled={isLoading}
            onChange={(v) => handleFiltersChange({ ...filters, username: v })}
          />
        </div>
        <div className={classes.playersList}>
          <PlayersList
            items={players}
            filters={filters}
            isLoading={isLoading}
            onFiltersChange={handleFiltersChange}
          />
        </div>
      </Container>
    </Layout>
  );
};
