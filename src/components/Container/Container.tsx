import React, { FC, ReactNode } from 'react';

import useStyles from './Container.styles';

export interface IContainerProps {
  children: ReactNode | ReactNode[];
}

export const Container: FC<IContainerProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
