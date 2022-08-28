import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import { IHandleValuesChangeFunction } from "types";
import { api } from "api";
import { Button, Input } from "components";
import { NUMBER_REGEXP } from "consts";

import useStyles from "./SignupForm.styles";

interface ISignupFormValues {
  username: string;
  password: string;
  rating: string;
}

export const SignupForm: FC = () => {
  const classes = useStyles();

  const [values, setValues] = useState<ISignupFormValues>({
    username: "",
    password: "",
    rating: "600",
  });

  const { username, password, rating } = values;

  const handleValuesChange: IHandleValuesChangeFunction<ISignupFormValues> =
    (key) => (value) =>
      setValues((prevState) => ({ ...prevState, [key]: value }));

  const handleSubmit = async () => {
    try {
      await api.fetchSignup({ ...values, rating: Number(values.rating) });
      window.location.href = "/login";
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
          isRequired
          onChange={handleValuesChange("username")}
        />
      </div>

      <div className={classes.element}>
        <Input
          type="password"
          value={password}
          label="Пароль"
          autoComplete="new-password"
          isRequired
          onChange={handleValuesChange("password")}
        />
      </div>

      <div className={classes.element}>
        <Input
          type="text"
          value={rating}
          label="Рейтинг"
          maxLength={3}
          isRequired
          onChange={(v) => {
            if (NUMBER_REGEXP.test(v)) {
              handleValuesChange("rating")(v);
            }
          }}
        />
      </div>

      <div className={classes.element}>
        <Button type="submit">Зарегистрироваться</Button>
      </div>

      <div className={classes.element}>
        Уже зарегистрированы?{" "}
        <Link to="/login" className={classes.link}>
          Войти
        </Link>
      </div>
    </form>
  );
};
