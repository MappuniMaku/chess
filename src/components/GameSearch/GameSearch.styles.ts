import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    columnGap: 16,
  },
});
