import { createUseStyles } from "react-jss";
import { colors } from "theme";

export default createUseStyles({
  root: {
    flexShrink: 0,
    borderTop: [1, "solid", colors.LIGHTEST_GRAY],
  },

  content: {
    display: "flex",
    padding: [16, 0],
    color: colors.GRAY,
  },
});
