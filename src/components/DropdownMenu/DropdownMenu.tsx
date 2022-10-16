import React, { FC } from 'react';

import useStyles from './DropdownMenu.styles';

export interface IDropdownMenuItem {
  text: string;
  onClick: () => void;
}

export interface IDropdownMenuProps {
  items: IDropdownMenuItem[];
}

export const DropdownMenu: FC<IDropdownMenuProps> = ({ items }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        {items.map((i) => {
          const { text, onClick } = i;
          return (
            <li key={text} className={classes.item}>
              <button type="button" className={classes.button} onClick={onClick}>
                {text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
