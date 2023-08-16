import React, { FC, useEffect, useRef, useState } from 'react';

import { Button, Game } from '@/components';
import { PieceColor } from '@/enums';
import { IBackendMove, IGame, IUser } from '@/types';
import { getCurrentPlayerFromGame, isArrayNotEmpty } from '@/helpers';
import { useAppDispatch } from '@/hooks';
import { fetchUser, updateActiveGame } from '@/store/slices';

import useStyles from './GameLauncher.styles';
import clsx from 'clsx';

export interface IGameLauncherProps {
  activeGame: IGame;
  user: IUser;
  onMakeMove(move: IBackendMove): void;
}

export const GameLauncher: FC<IGameLauncherProps> = ({ activeGame, user, onMakeMove }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const gameContainerRef = useRef<HTMLDivElement>(null);

  const [isGameInitialized, setIsGameInitialized] = useState(false);
  const [game, setGame] = useState<Game>();
  const [isGameFinished, setIsGameFinished] = useState(false);

  const { movesLog, white, black } = activeGame;

  const currentPlayer = getCurrentPlayerFromGame(activeGame, user);
  const isUserWhite = white.user.username === user.username;

  const handleStartNewGame = () => {
    dispatch(updateActiveGame(undefined));
  };

  useEffect(() => {
    const container = gameContainerRef.current;
    if (container === null || isGameInitialized) {
      return;
    }
    const gameInstance = new Game({
      $el: container,
      playerColor: currentPlayer?.color as PieceColor,
      movesLog,
      onMakeMove,
    });
    setGame(gameInstance);
    setIsGameInitialized(true);
  }, [gameContainerRef, isGameInitialized]);

  useEffect(() => {
    if (game === undefined || !isArrayNotEmpty(movesLog)) {
      return;
    }

    const lastMove = movesLog[movesLog.length - 1];
    game.board.addMoveFromMovesLog(lastMove);

    if (lastMove.isMate || lastMove.isStalemate) {
      dispatch(fetchUser());
      setIsGameFinished(true);
    }
  }, [game, movesLog]);

  return (
    <div className={classes.root}>
      {isGameFinished && (
        <div className={classes.newGameButton}>
          <Button onClick={handleStartNewGame}>Новая игра</Button>
        </div>
      )}
      <div className={classes.playersInfo}>
        <span className={clsx(isUserWhite && classes.bold)}>
          {white.user.username} ({white.user.rating} ПТС) (белые)
        </span>
        &nbsp;—{' '}
        <span className={clsx(!isUserWhite && classes.bold)}>
          {black.user.username} ({black.user.rating} ПТС) (чёрные)
        </span>
      </div>
      <div ref={gameContainerRef} />
    </div>
  );
};
