import React, { FC, useEffect, useState } from 'react';

import { api } from '@/api';
import { IGameHistory, IUser } from '@/types';
import { Preloader } from '@/components';
import {
  getRatingChangeFromGameHistory,
  getResultFromGameHistory,
  isArrayNotEmpty,
} from '@/helpers';

import useStyles from './GamesHistory.styles';
import clsx from 'clsx';
import { RatingChangeChart } from '@/components/RatingChangeChart';

export interface IGamesHistoryProps {
  user: IUser;
}

export const GamesHistory: FC<IGamesHistoryProps> = ({ user }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [gamesHistory, setGamesHistory] = useState<IGameHistory[]>([]);

  const fetchGamesHistory = async () => {
    try {
      setIsLoading(true);
      const result = await api.fetchMyGames();
      setGamesHistory(result.map((item) => ({ ...item, date: new Date(item.date) })));
    } catch (err) {
      console.error('Failed to fetch games history', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGamesHistory();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>История игр</h1>
      {isArrayNotEmpty(gamesHistory) ? (
        <>
          <div className={classes.header}>
            <div>Дата</div>
            <div>Соперники</div>
            <div>Результат</div>
          </div>
          <ul className={classes.list}>
            {gamesHistory.map((item) => {
              const { text: resultText, result } = getResultFromGameHistory(item, user);
              const { text: ratingChangeText } = getRatingChangeFromGameHistory(item, user);
              const isUserWhite = item.white === user.username;

              return (
                <li key={item.id} className={classes.item}>
                  <div>{item.date.toLocaleString()}</div>
                  <div>
                    <span className={clsx(isUserWhite && classes.bold)}>{item.white} (белые)</span>
                    &nbsp;—{' '}
                    <span className={clsx(!isUserWhite && classes.bold)}>
                      {item.black} (чёрные)
                    </span>
                  </div>
                  <div className={classes[result]}>
                    {resultText}&nbsp;({ratingChangeText})
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={classes.chart}>
            <RatingChangeChart gamesHistory={gamesHistory} user={user} />
          </div>
        </>
      ) : (
        <div>Вы пока не сыграли ни одной игры</div>
      )}
    </div>
  );
};
