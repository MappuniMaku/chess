import React, { FC } from "react";
import HashLoader from "react-spinners/HashLoader";
import SyncLoader from "react-spinners/SyncLoader";

import { colors } from "theme";

import useStyles from "./Preloader.styles";

type IPreloaderType = "hash" | "sync";

const loadersEnum: Record<
  IPreloaderType,
  typeof HashLoader | typeof SyncLoader
> = {
  hash: HashLoader,
  sync: SyncLoader,
};

interface IPreloaderProps {
  type?: IPreloaderType;
  size?: number;
  color?: string;
}

export const Preloader: FC<IPreloaderProps> = ({
  type = "hash",
  size = 20,
  color = colors.GREEN,
}) => {
  const classes = useStyles();

  const Loader = loadersEnum[type];

  return (
    <div className={classes.root}>
      <Loader size={size} color={color} />
    </div>
  );
};
