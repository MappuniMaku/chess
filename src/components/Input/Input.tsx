import React, { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import useStyles from './Input.styles';

interface IInputProps {
  value: string;
  type?: 'text' | 'password';
  label?: string;
  maxLength?: number;
  autoComplete?: 'username' | 'current-password' | 'new-password';
  errorText?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  onChange: (value: string) => void;
}

export const Input: FC<IInputProps> = ({
  value,
  type = 'text',
  label,
  maxLength,
  autoComplete,
  errorText,
  isDisabled,
  isRequired,
  isInvalid,
  onChange,
}) => {
  const classes = useStyles();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isDisabled) {
      setIsFocused(false);
    }
  }, [isDisabled]);

  return (
    <div
      className={clsx(classes.root, {
        [classes.focused]: isFocused,
        [classes.hasValue]: value !== '',
        [classes.invalid]: isInvalid,
      })}
    >
      <div className={classes.inputWrapper}>
        <input
          ref={inputRef}
          className={classes.input}
          value={value}
          type={type}
          maxLength={maxLength}
          autoComplete={autoComplete}
          disabled={isDisabled}
          required={isRequired}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <span className={classes.label}>{label}</span>
      </div>

      {errorText !== undefined && <div className={classes.errorText}>{errorText}</div>}
    </div>
  );
};
