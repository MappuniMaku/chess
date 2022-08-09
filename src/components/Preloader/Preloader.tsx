import React, { FC } from "react";
import HashLoader from "react-spinners/HashLoader";

import { colors } from "theme";

import useStyles from "./Preloader.styles";

interface IPreloaderProps {
  size?: number;
}

export const Preloader: FC<IPreloaderProps> = ({ size = 20 }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HashLoader size={size} color={colors.GREEN} />
    </div>
  );
};
