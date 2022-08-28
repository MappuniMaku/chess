import React, { FC } from "react";

import { Container, LoginForm } from "components";

import useStyles from "./LoginPage.styles";

export const LoginPage: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <h1 className={classes.heading}>Вход</h1>

        <div className={classes.form}>
          <LoginForm />
        </div>
      </Container>
    </div>
  );
};
