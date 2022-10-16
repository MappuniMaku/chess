import React, { FC } from 'react';

import { Container, SignupForm } from 'components';

import useStyles from './SignupPage.styles';

export const SignupPage: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <h1 className={classes.heading}>Регистрация</h1>

        <div className={classes.form}>
          <SignupForm />
        </div>
      </Container>
    </div>
  );
};
