import React, { FC, useState } from "react";

import { IHandleValuesChangeFunction } from "types";
import { api } from "api";

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
      className={classes.root}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <input
          type="text"
          value={username}
          placeholder="Имя пользователя"
          onChange={(e) => handleValuesChange("username")(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={(e) => handleValuesChange("password")(e.target.value)}
        />
      </div>

      <div>
        <button type="submit">Войти</button>
      </div>
    </form>
  );
};
