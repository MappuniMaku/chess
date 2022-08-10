import React, { FC } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { Container, Preloader } from "components";
import { useAppSelector } from "hooks";

import useStyles from "./Header.styles";

export interface IHeaderProps {
  currentPage: "main" | "game" | "playersList";
}

const pages: Array<{
  name: IHeaderProps["currentPage"];
  link: string;
  text: string;
}> = [
  {
    name: "main",
    link: "/",
    text: "Главная",
  },
  {
    name: "game",
    link: "/game",
    text: "Играть",
  },
  {
    name: "playersList",
    link: "/players",
    text: "Список игроков",
  },
];

export const Header: FC<IHeaderProps> = ({ currentPage }) => {
  const classes = useStyles();

  const { value: user, isLoading: isUserLoading } = useAppSelector(
    (state) => state.user
  );
  const { username, rating } = user ?? {};

  const links = pages.map((p) => ({
    ...p,
    isActive: p.name === currentPage,
  }));

  return (
    <header className={classes.root}>
      <Container>
        <div className={classes.content}>
          <div className={classes.menu}>
            {links.map((l) => {
              const { name, link, text, isActive } = l;

              if (isActive) {
                return (
                  <span
                    key={name}
                    className={clsx(classes.menuItem, classes.activeMenuItem)}
                  >
                    {text}
                  </span>
                );
              }

              return (
                <Link
                  key={name}
                  to={link}
                  className={clsx(classes.menuItem, classes.menuLink)}
                >
                  {text}
                </Link>
              );
            })}
          </div>

          <div className={classes.accountSection}>
            {isUserLoading ? (
              <Preloader />
            ) : user === undefined ? (
              <Link to="/login" className={classes.loginLink}>
                Войти
              </Link>
            ) : (
              <div className={classes.account}>
                <span className={classes.username}>{username}</span>
                <span className={classes.rating}>Рейтинг: {rating}</span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
