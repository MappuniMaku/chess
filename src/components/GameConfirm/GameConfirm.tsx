import React, { FC, useEffect, useState } from 'react';

import { Button } from '@/components';
import { socket, useAppSelector } from '@/hooks';
import { WsEvents } from '@/enums';
import { getCurrentPlayerFromGame, getOpponentFromGame } from '@/helpers';

import useStyles from './GameConfirm.styles';

export const GameConfirm: FC = () => {
  const classes = useStyles();

  const [timeLeft, setTimeLeft] = useState(0);

  const { value: user } = useAppSelector((state) => state.user);
  const { value: activeGame } = useAppSelector((state) => state.activeGame);

  const currentPlayer = getCurrentPlayerFromGame(activeGame, user);
  const { isGameAccepted = false } = currentPlayer ?? {};

  const opponent = getOpponentFromGame(activeGame, user);
  const { username: opponentUsername, rating: opponentRating } = opponent?.user ?? {};

  useEffect(() => {
    const secondsLeft = activeGame?.acceptanceStatus?.secondsLeft;
    if (secondsLeft === undefined) {
      return;
    }
    setTimeLeft(secondsLeft - 1);
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeGame]);

  return (
    <div className={classes.root}>
      <h2 className={classes.text}>Игра найдена!</h2>

      <div className={classes.opponentInfo}>
        <p>Оппонент: {opponentUsername}</p>
        <p>Рейтинг: {opponentRating}</p>
      </div>

      <div className={classes.timeLeft}>
        {isGameAccepted ? (
          <span>Ожидаем, пока соперник примет игру ({timeLeft} с.)</span>
        ) : (
          <span>Осталось {timeLeft} с., чтобы принять игру</span>
        )}
      </div>

      <div className={classes.buttons}>
        <div>
          <Button
            isLoading={isGameAccepted}
            onClick={() => socket.emit(WsEvents.AcceptGame, { gameId: activeGame?.id })}
          >
            Принять
          </Button>
        </div>
        <div>
          <Button
            isDisabled={isGameAccepted}
            onClick={() => socket.emit(WsEvents.DeclineGame, { gameId: activeGame?.id })}
          >
            Отклонить
          </Button>
        </div>
      </div>
    </div>
  );
};
