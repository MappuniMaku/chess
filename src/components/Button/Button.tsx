import React, { FC, ReactNode } from "react";

import useStyles from "./Button.styles";

export interface IButtonProps {
  children: ReactNode | ReactNode[];
  type?: "submit" | "button";
  isDisabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({
  children,
  type = "button",
  isDisabled,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <button
      type={type}
      className={classes.root}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
