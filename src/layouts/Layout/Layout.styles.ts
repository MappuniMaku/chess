import { createUseStyles } from "react-jss";

export default createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  main: {
    flexGrow: 1,
    padding: [40, 0],
  },

  loader: {
    display: "flex",
    justifyContent: "center",
  },
});
