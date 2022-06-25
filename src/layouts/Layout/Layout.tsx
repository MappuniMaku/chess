import React, { FC, ReactNode } from "react";

import { Footer, Header, IHeaderProps } from "components";

import useStyles from "./Layout.styles";

export interface ILayoutProps {
  currentPage: IHeaderProps["currentPage"];
  children: ReactNode | ReactNode[];
}

export const Layout: FC<ILayoutProps> = ({ currentPage, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header currentPage={currentPage} />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
};
