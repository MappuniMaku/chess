import React, { FC, useEffect, useRef, useState } from 'react';

import { Button, Game } from '@/components';
import { PieceColor } from '@/enums';
import { IBackendMove } from '@/types';
import { isArrayNotEmpty } from '@/helpers';
import { useAppDispatch } from '@/hooks';
import { fetchUser, updateActiveGame } from '@/store/slices';

import useStyles from './GameLauncher.styles';

export interface IGameLauncherProps {
  movesLog?: IBackendMove[];
  playerColor: PieceColor;
  onMakeMove(move: IBackendMove): void;
}

export const GameLauncher: FC<IGameLauncherProps> = ({ movesLog, playerColor, onMakeMove }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const gameContainerRef = useRef<HTMLDivElement>(null);

  const [isGameInitialized, setIsGameInitialized] = useState(false);
  const [game, setGame] = useState<Game>();
  const [isGameFinished, setIsGameFinished] = useState(false);

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
      playerColor,
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
      <div ref={gameContainerRef} />
    </div>
  );
};
