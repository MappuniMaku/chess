import React, { FC, useEffect, useRef, useState } from 'react';

import { Game } from '@/components';
import { PieceColor } from '@/enums';
import { IBackendMove } from '@/types';
import { isArrayNotEmpty } from '@/helpers';

export interface IGameLauncherProps {
  movesLog?: IBackendMove[];
  playerColor: PieceColor;
  onMakeMove(move: IBackendMove): void;
}

export const GameLauncher: FC<IGameLauncherProps> = ({ movesLog, playerColor, onMakeMove }) => {
  const [isGameInitialized, setIsGameInitialized] = useState(false);
  const [game, setGame] = useState<Game>();

  const gameContainerRef = useRef<HTMLDivElement>(null);

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

    game.board.addMoveFromMovesLog(movesLog[movesLog.length - 1]);
  }, [game, movesLog]);

  return <div ref={gameContainerRef} />;
};
