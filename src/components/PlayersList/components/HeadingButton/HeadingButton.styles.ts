import { createUseStyles } from "react-jss";
import { colors } from "theme";

export default createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    background: "none",
    border: "none",
    outline: "none",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 1.5,
    color: colors.BLACK,
    cursor: "pointer",
    transition: "color 0.2s ease-in-out",

    "&:hover, &:focus": {
      color: colors.DARK_GRAY,
    },

    "&:disabled": {
      color: colors.BLACK,
      cursor: "default",
    },
  },
});
