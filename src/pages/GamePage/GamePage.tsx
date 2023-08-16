import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from '@/layouts';
import { Button, Container, GameConfirm, GameLauncher, GameSearch } from '@/components';
import { socket, useAppSelector } from '@/hooks';
import { WsEvents } from '@/enums';
import { IBackendMove } from '@/types';

import useStyles from './GamePage.styles';

export const GamePage: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { value: user } = useAppSelector((state) => state.user);
  const { value: activeGame } = useAppSelector((state) => state.activeGame);
  const { id: activeGameId, isStarted: isGameStarted } = activeGame ?? {};

  const handleMakeMove = (move: IBackendMove) => {
    socket.emit(WsEvents.MakeMove, { move, gameId: activeGameId });
  };

  return (
    <Layout currentPage="game">
      <Container>
        <div className={classes.root}>
          {user !== undefined ? (
            <>
              {activeGame === undefined ? (
                <GameSearch />
              ) : (
                <>
                  {!isGameStarted ? (
                    <GameConfirm />
                  ) : (
                    <GameLauncher activeGame={activeGame} user={user} onMakeMove={handleMakeMove} />
                  )}
                </>
              )}
            </>
          ) : (
            <Button onClick={() => navigate('/login')}>Войти</Button>
          )}
        </div>
      </Container>
    </Layout>
  );
};
