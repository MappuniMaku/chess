import React, { FC } from 'react';

import { Layout } from 'layouts';
import { Container } from 'components';

export const MainPage: FC = () => {
  return (
    <Layout currentPage="main">
      <Container>
        <div>Главная</div>
      </Container>
    </Layout>
  );
};
