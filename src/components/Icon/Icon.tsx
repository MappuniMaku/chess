import React, { FC } from "react";
import clsx from "clsx";

import useStyles from "./Icon.styles";

interface IIconProps {
  type: string;
  size?: 18 | 24 | 36 | 48;
}

export const Icon: FC<IIconProps> = ({ type, size = 24 }) => {
  const classes = useStyles({ size });

  return <span className={clsx("material-icons", classes.root)}>{type}</span>;
};
