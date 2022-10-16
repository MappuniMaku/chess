import React, { FC, ReactNode } from 'react';

import useStyles from './TextButton.styles';

export interface ITextButtonProps {
  children: ReactNode | ReactNode[];
  type?: 'submit' | 'button';
  isDisabled?: boolean;
  onClick?: () => void;
}

export const TextButton: FC<ITextButtonProps> = ({
  children,
  type = 'button',
  isDisabled,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <button type={type} className={classes.root} disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  );
};
