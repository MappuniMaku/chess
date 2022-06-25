export const colors = {
  GRAY: "#999999",
  LIGHTEST_GRAY: "#d4d6d8",
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
