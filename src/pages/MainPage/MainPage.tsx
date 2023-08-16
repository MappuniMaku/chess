import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from '@/layouts';
import { Button, Container, GamesHistory } from '@/components';
import { useAppSelector } from '@/hooks';

import useStyles from './MainPage.styles';

export const MainPage: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { value: user } = useAppSelector((state) => state.user);

  return (
    <Layout currentPage="main">
      <Container>
        <Button onClick={() => navigate('/game')}>Играть</Button>
        {user !== undefined && (
          <div className={classes.gamesHistory}>
            <GamesHistory user={user} />
          </div>
        )}
      </Container>
    </Layout>
  );
};
