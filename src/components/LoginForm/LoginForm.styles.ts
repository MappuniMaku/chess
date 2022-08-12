import { createUseStyles } from "react-jss";

export default createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: [40, 0],
  },

  element: {
    "&:not(:last-child)": {
      marginBottom: 20,
    },
  },
});
