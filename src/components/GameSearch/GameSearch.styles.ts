import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {},

  banInfo: {
    marginBottom: 24,
  },

  buttons: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    columnGap: 16,
  },
});
