export const colors = {
  BLACK: "#1c0a00",
  DARK_GRAY: "#73777B",
  GRAY: "#999999",
  LIGHT_GRAY: "#d4d6d8",
  LIGHTER_GRAY: "#eeeeee",
  LIGHTEST_GRAY: "#f8f8f8",
  GREEN: "#79d70f",
  GREEN_HOVER: "#3ec70b",
  GREEN_ACTIVE: "#61b15a",
  RED: "#ff0800",
};

export const linkStyles = {
  outline: "none",
  color: colors.GREEN,

  "&:hover, &:focus": {
    color: colors.GREEN_HOVER,
  },

  "&:active": {
    color: colors.GREEN_ACTIVE,
  },
};

export const boxShadows = {
  LIGHT: `0px 8px 24px ${colors.LIGHTER_GRAY}`,
};
