import React, { FC, useRef, useState } from 'react';

import { DropdownMenu, Icon, IDropdownMenuItem } from 'components';
import { clearCookie } from 'helpers';
import { useAppSelector, useOnClickOutside } from 'hooks';

import useStyles from './Account.styles';

const accountMenuItems: IDropdownMenuItem[] = [
  {
    text: 'Выйти',
    onClick: () => {
      clearCookie('token');
      window.location.reload();
    },
  },
];

export const Account: FC = () => {
  const classes = useStyles();

  const { value: user } = useAppSelector((state) => state.user);
  const { username, rating } = user ?? {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside({
    ref: dropdownRef,
    handler: () => setIsMenuOpen(false),
    excludedRef: buttonRef,
  });

  const handleAccountButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <button
        ref={buttonRef}
        type="button"
        className={classes.accountButton}
        onClick={handleAccountButtonClick}
      >
        <Icon type="account_circle" />
        <span className={classes.account}>
          <span className={classes.username}>{username}</span>
          <span className={classes.rating}>Рейтинг: {rating}</span>
        </span>
      </button>
      {isMenuOpen && (
        <div ref={dropdownRef} className={classes.dropdown}>
          <DropdownMenu items={accountMenuItems} />
        </div>
      )}
    </div>
  );
};
