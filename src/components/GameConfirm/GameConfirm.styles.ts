import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {},

  text: {
    marginBottom: 24,
  },

  opponentInfo: {
    display: 'grid',
    gridAutoFlow: 'row',
    rowGap: 8,
    marginBottom: 24,
  },

  timeLeft: {
    marginBottom: 12,
  },

  buttons: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    columnGap: 16,
  },
});
