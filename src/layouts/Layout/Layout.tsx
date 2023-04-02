import React, { FC, ReactNode } from 'react';

import { Footer, Header, IHeaderProps, Preloader } from '@/components';
import { useAppSelector } from '@/hooks';

import useStyles from './Layout.styles';

export interface ILayoutProps {
  currentPage: IHeaderProps['currentPage'];
  children: ReactNode | ReactNode[];
}

export const Layout: FC<ILayoutProps> = ({ currentPage, children }) => {
  const classes = useStyles();

  const isUserLoading = useAppSelector((state) => state.user.isLoading);

  return (
    <div className={classes.root}>
      <Header currentPage={currentPage} />
      <main className={classes.main}>
        {!isUserLoading ? (
          children
        ) : (
          <div className={classes.loader}>
            <Preloader />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
