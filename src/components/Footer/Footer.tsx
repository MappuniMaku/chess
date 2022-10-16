import React, { FC } from 'react';

import { Container } from 'components';

import useStyles from './Footer.styles';

export const Footer: FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container>
        <div className={classes.content}>{new Date().getFullYear()}</div>
      </Container>
    </footer>
  );
};
