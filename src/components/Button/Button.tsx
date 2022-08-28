import React, { FC, ReactNode } from "react";

import useStyles from "./Button.styles";

export interface IButtonProps {
  children: ReactNode | ReactNode[];
  type?: "submit" | "button";
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({
  children,
  type = "button",
  onClick,
}) => {
  const classes = useStyles();

  return (
    <button type={type} className={classes.root} onClick={onClick}>
      {children}
    </button>
  );
};
