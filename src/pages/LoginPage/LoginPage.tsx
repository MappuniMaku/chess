import React, { FC } from "react";

import { Container, LoginForm } from "components";

import useStyles from "./LoginPage.styles";

export const LoginPage: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div>
          <LoginForm />
        </div>
      </Container>
    </div>
  );
};
