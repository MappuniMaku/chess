import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import { IHandleValuesChangeFunction } from "types";
import { api } from "api";
import { Button, Input } from "components";

import useStyles from "./LoginForm.styles";

interface ILoginFormValues {
  username: string;
  password: string;
}

export const LoginForm: FC = () => {
  const classes = useStyles();

  const [values, setValues] = useState<ILoginFormValues>({
    username: "",
    password: "",
  });

  const { username, password } = values;

  const handleValuesChange: IHandleValuesChangeFunction<ILoginFormValues> =
    (key) => (value) =>
      setValues((prevState) => ({ ...prevState, [key]: value }));

  const handleSubmit = async () => {
    try {
      await api.fetchLogin(values);
      window.location.href = "/";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className={classes.element}>
        <Input
          type="text"
          value={username}
          label="Имя пользователя"
          autoComplete="username"
          isRequired
          onChange={handleValuesChange("username")}
        />
      </div>

      <div className={classes.element}>
        <Input
          type="password"
          value={password}
          label="Пароль"
          autoComplete="current-password"
          isRequired
          onChange={handleValuesChange("password")}
        />
      </div>

      <div className={classes.element}>
        <Button type="submit">Войти</Button>
      </div>

      <div className={classes.element}>
        Еще не зарегистрированы?{" "}
        <Link to="/signup" className={classes.link}>
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
};
