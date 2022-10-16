import React, { FC, ReactNode } from 'react';

import { Preloader } from 'components';

import useStyles from './Button.styles';

export interface IButtonProps {
  children: ReactNode | ReactNode[];
  type?: 'submit' | 'button';
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({
  children,
  type = 'button',
  isDisabled,
  isLoading,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <button
      type={type}
      className={classes.root}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <span className={classes.loader}>
          <Preloader type="sync" size={8} color="white" speed={0.7} />
        </span>
      )}
      {children}
    </button>
  );
};
