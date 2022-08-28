import { createUseStyles } from "react-jss";
import { colors } from "theme";

export default createUseStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: [16, 32],
    backgroundColor: colors.GREEN,
    border: "none",
    borderRadius: 12,
    outline: "none",
    fontSize: 16,
    color: "white",
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transition: "0.25s ease-in-out",

    "&:hover, &:focus": {
      backgroundColor: colors.GREEN_HOVER,
    },

    "&:active": {
      backgroundColor: colors.GREEN_ACTIVE,
    },
  },
});
