import React, { FC, useEffect, useState } from 'react';

import { Button } from '@/components';
import { socket, useAppSelector } from '@/hooks';
import { WsEvents } from '@/enums';

import useStyles from './GameSearch.styles';

export const GameSearch: FC = () => {
  const classes = useStyles();

  const [timeLeft, setTimeLeft] = useState(0);

  const { value: user } = useAppSelector((state) => state.user);
  const { searchingForGameUsers } = useAppSelector((state) => state.searchingForGameUsersList);
  const { bannedPlayers } = useAppSelector((state) => state.bannedPlayers);

  const isUserSearchingForGame = searchingForGameUsers.some((u) => u.username === user?.username);
  const currentBannedPlayer = bannedPlayers.find(
    (bannedPlayer) => bannedPlayer.user.username === user?.username,
  );
  const {
    timeLeft: banTimeLeft,
    isBanActive,
    consequentlyDeclinedGamesCount,
  } = currentBannedPlayer ?? {};

  useEffect(() => {
    const secondsLeft = banTimeLeft;
    if (secondsLeft === undefined) {
      return;
    }
    setTimeLeft(secondsLeft - 1);
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [banTimeLeft]);

  return (
    <div className={classes.root}>
      {isBanActive && (
        <p className={classes.banInfo}>
          Вы отказались от игры и за это временно лишены возможности искать новые. Оставшееся
          время:&nbsp;
          {timeLeft}с. Отклонено игр за последнее время: {consequentlyDeclinedGamesCount}
        </p>
      )}
      <div className={classes.buttons}>
        <div>
          <Button
            isLoading={isUserSearchingForGame}
            isDisabled={isBanActive}
            onClick={() => socket.emit(WsEvents.StartSearching)}
          >
            Поиск игры
          </Button>
        </div>
        {isUserSearchingForGame && (
          <div>
            <Button onClick={() => socket.emit(WsEvents.CancelSearching)}>Отмена</Button>
          </div>
        )}
      </div>
    </div>
  );
};
