import React, { FC, useEffect, useState } from "react";

import { IUser } from "types";
import { Layout } from "layouts";
import { Container, PlayersList } from "components";
import { api } from "api";

import useStyles from "./PlayersListPage.styles";

export const PlayersListPage: FC = () => {
  const classes = useStyles();

  const [players, setPlayers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const response = await api.fetchUsers();
      setPlayers(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <Layout currentPage="playersList">
      <Container>
        <div className={classes.playersList}>
          <PlayersList items={players} isLoading={isLoading} />
        </div>
      </Container>
    </Layout>
  );
};
