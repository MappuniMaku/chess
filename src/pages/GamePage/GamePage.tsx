import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from '@/layouts';
import { Button, Container, GameConfirm, GameLauncher, GameSearch } from '@/components';
import { useAppSelector } from '@/hooks';

import useStyles from './GamePage.styles';

export const GamePage: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { value: user } = useAppSelector((state) => state.user);
  const { value: activeGame } = useAppSelector((state) => state.activeGame);
  const { isStarted: isGameStarted } = activeGame ?? {};

  return (
    <Layout currentPage="game">
      <Container>
        <div className={classes.root}>
          <GameLauncher />
          {/*{user !== undefined ? (*/}
          {/*  <>*/}
          {/*    {activeGame === undefined ? (*/}
          {/*      <GameSearch />*/}
          {/*    ) : (*/}
          {/*      <>{!isGameStarted ? <GameConfirm /> : <GameLauncher />}</>*/}
          {/*    )}*/}
          {/*  </>*/}
          {/*) : (*/}
          {/*  <Button onClick={() => navigate('/login')}>Войти</Button>*/}
          {/*)}*/}
        </div>
      </Container>
    </Layout>
  );
};
