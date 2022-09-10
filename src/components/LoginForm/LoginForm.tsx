import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import { IHandleValuesChangeFunction, ILoginFormValues } from "types";
import { api } from "api";
import { Button, Input } from "components";
import { useIsMounted } from "hooks";

import useStyles from "./LoginForm.styles";

const initialFormValues: ILoginFormValues = {
  username: "",
  password: "",
};

export const LoginForm: FC = () => {
  const classes = useStyles();
  const isMounted = useIsMounted();

  const [values, setValues] = useState<ILoginFormValues>(initialFormValues);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { username, password } = values;

  const handleValuesChange: IHandleValuesChangeFunction<ILoginFormValues> =
    (key) => (value) => {
      setValues((prevState) => ({ ...prevState, [key]: value }));
      setHasError(false);
    };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.fetchLogin(values);
      window.location.href = "/";
    } catch (e) {
      console.error(e);
      if (isMounted()) {
        setHasError(true);
      }
    } finally {
      if (isMounted()) {
        setIsLoading(false);
      }
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
          isDisabled={isLoading}
          isInvalid={hasError}
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
          isDisabled={isLoading}
          isInvalid={hasError}
          errorText={
            hasError ? "Неверное имя пользователя или пароль" : undefined
          }
          isRequired
          onChange={handleValuesChange("password")}
        />
      </div>

      <div className={classes.element}>
        <Button type="submit" isDisabled={hasError || isLoading}>
          Войти
        </Button>
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
