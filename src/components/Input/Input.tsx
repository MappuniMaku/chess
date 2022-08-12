import React, { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import useStyles from "./Input.styles";

interface IInputProps {
  value: string;
  type?: "text" | "password";
  label?: string;
  isDisabled?: boolean;
  onChange: (value: string) => void;
}

export const Input: FC<IInputProps> = ({
  value,
  type = "text",
  label,
  isDisabled,
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
        [classes.hasValue]: value !== "",
      })}
    >
      <input
        ref={inputRef}
        className={classes.input}
        value={value}
        type={type}
        disabled={isDisabled}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span className={classes.label}>{label}</span>
    </div>
  );
};
