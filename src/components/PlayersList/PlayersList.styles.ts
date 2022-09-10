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

    "&:not(:last-child)": {
      borderBottom: [1, "solid", colors.LIGHT_GRAY],
    },
  },

  scrollLoader: {
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
  },

  noItemsMessage: {
    marginTop: 8,
    paddingLeft: 16,
    fontSize: 14,
  },

  loader: {
    display: "flex",
    justifyContent: "center",
    marginTop: 32,
  },
});
