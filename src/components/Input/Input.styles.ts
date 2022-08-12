import { createUseStyles } from "react-jss";
import { colors } from "theme";

export default createUseStyles({
  root: {
    position: "relative",
  },

  floatingLabel: {
    "& $label": {
      transform: "scale(0.8) translate(0, -125%)",
    },
  },

  focused: {
    extend: "floatingLabel",

    "& $label": {
      color: colors.GREEN_HOVER,
    },

    "& $input": {
      borderColor: colors.GREEN_HOVER,
    },
  },

  hasValue: {
    extend: "floatingLabel",
  },

  input: {
    width: "100%",
    height: 48,
    padding: [16, 12, 0],
    backgroundColor: "white",
    border: [1, "solid", colors.LIGHT_GRAY],
    borderRadius: 4,
    outline: "none",
    fontSize: 16,
    transition: "0.25s ease-in-out",
    transitionProperty: "border, background-color",

    "&:hover": {
      borderColor: colors.GREEN_HOVER,
    },

    "&:disabled": {
      borderColor: colors.LIGHTEST_GRAY,

      "& + $label": {
        color: colors.LIGHT_GRAY,
      },
    },
  },

  label: {
    position: "absolute",
    top: "calc(50% + 1px)",
    left: 12,
    display: "block",
    fontSize: 16,
    transform: "translateY(-50%)",
    transformOrigin: "top left",
    pointerEvents: "none",
    color: colors.GRAY,
    transition: "0.25s ease-in-out",
    transitionProperty: "transform, color",
  },
});
