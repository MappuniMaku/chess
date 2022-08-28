export const colors = {
  BLACK: "#1c0a00",
  DARK_GRAY: "#73777B",
  GRAY: "#999999",
  LIGHT_GRAY: "#d4d6d8",
  LIGHTEST_GRAY: "#eeeeee",
  GREEN: "#79d70f",
  GREEN_HOVER: "#3ec70b",
  GREEN_ACTIVE: "#61b15a",
};

export const linkStyles = {
  color: colors.GREEN,

  "&:hover, &:focus": {
    color: colors.GREEN_HOVER,
  },

  "&:active": {
    color: colors.GREEN_ACTIVE,
  },
};
