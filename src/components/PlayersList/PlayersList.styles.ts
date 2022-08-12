import { createUseStyles } from "react-jss";
import { colors } from "theme";

export default createUseStyles({
  root: {},

  header: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "1fr",
    padding: [8, 16],
    borderBottom: [1, "solid", colors.LIGHT_GRAY],
    fontWeight: "bold",
  },

  list: {
    listStyle: "none",
  },

  listItem: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "1fr",
    padding: [8, 16],
    borderBottom: [1, "solid", colors.LIGHT_GRAY],
  },

  loader: {
    display: "flex",
    justifyContent: "center",
    marginTop: 32,
  },
});
