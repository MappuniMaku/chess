import { createUseStyles } from "react-jss";
import { colors } from "theme";
import { rgba } from "helpers";

export default createUseStyles({
  root: {
    outline: "none",
    border: "none",
    background: "none",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.GREEN,
    cursor: "pointer",
    transitionProperty: "color",
    transition: "0.25s ease-in-out",

    "&:hover, &:focus": {
      color: colors.GREEN_HOVER,
    },

    "&:active": {
      color: colors.GREEN_ACTIVE,
    },

    "&:disabled": {
      color: rgba(colors.GREEN, 0.5),
      cursor: "default",
    },
  },
});
