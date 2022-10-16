import React, { FC } from "react";

import { Layout } from "layouts";
import { Container, GameConfirm, GameLauncher, GameSearch } from "components";
import { useAppSelector } from "hooks";

import useStyles from "./GamePage.styles";

export const GamePage: FC = () => {
  const classes = useStyles();

  const { value: user } = useAppSelector((state) => state.user);
  const { value: activeGame } = useAppSelector((state) => state.activeGame);
  const { isStarted: isGameStarted } = activeGame ?? {};

  return (
    <Layout currentPage="game">
      <Container>
        <div className={classes.root}>
          {user !== undefined && (
            <>
              {activeGame === undefined ? (
                <GameSearch />
              ) : (
                <>{!isGameStarted ? <GameConfirm /> : <GameLauncher />}</>
              )}
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
};
