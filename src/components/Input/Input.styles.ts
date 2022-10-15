import { createUseStyles } from "react-jss";
import { colors } from "theme";

export default createUseStyles({
  root: {},

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

  invalid: {
    "& $input": {
      borderColor: colors.RED,

      "&:hover": {
        borderColor: colors.RED,
      },
    },

    "& $label": {
      color: colors.RED,
    },
  },

  hasValue: {
    extend: "floatingLabel",
  },

  inputWrapper: {
    position: "relative",
  },

  input: {
    width: "100%",
    height: 48,
    padding: [16, 16, 0],
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
      borderColor: colors.LIGHTER_GRAY,

      "& + $label": {
        color: colors.LIGHT_GRAY,
      },
    },
  },

  label: {
    position: "absolute",
    top: "calc(50% + 1px)",
    left: 16,
    display: "block",
    fontSize: 16,
    transform: "translateY(-50%)",
    transformOrigin: "top left",
    pointerEvents: "none",
    color: colors.GRAY,
    transition: "0.25s ease-in-out",
    transitionProperty: "transform, color",
  },

  errorText: {
    marginTop: 4,
    paddingLeft: 16,
    fontSize: 14,
    color: colors.RED,
  },
});
