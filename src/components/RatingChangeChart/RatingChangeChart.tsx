import React, { FC, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { IGameHistory, IUser } from '@/types';
import { getRatingChangeFromGameHistory } from '@/helpers';
import { colors } from '@/theme';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface IRatingChangeChartProps {
  gamesHistory: IGameHistory[];
  user: IUser;
}

export const RatingChangeChart: FC<IRatingChangeChartProps> = ({ gamesHistory, user }) => {
  const mappedData = useMemo(() => {
    let currentRating = user.initialRating;
    const result: Array<{ date: Date; rating: number }> = [];
    result.push({ date: new Date(user.createdAt), rating: currentRating });
    gamesHistory.forEach((item) => {
      const { change: playerRatingChange } = getRatingChangeFromGameHistory(item, user);
      currentRating += playerRatingChange;
      result.push({ date: item.date, rating: currentRating });
    });
    return result.map((item) => ({ ...item, date: item.date.toLocaleString() }));
  }, [gamesHistory]);

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Динамика ПТС',
          },
        },
      }}
      data={{
        labels: mappedData.map((item) => item.date),
        datasets: [
          {
            label: 'ПТС',
            data: mappedData.map((item) => item.rating),
            borderColor: colors.GREEN,
            backgroundColor: colors.GREEN,
          },
        ],
      }}
    />
  );
};
