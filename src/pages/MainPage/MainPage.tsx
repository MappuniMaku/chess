import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from '@/layouts';
import { Button, Container } from '@/components';

export const MainPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Layout currentPage="main">
      <Container>
        <Button onClick={() => navigate('/game')}>Играть</Button>
      </Container>
    </Layout>
  );
};
