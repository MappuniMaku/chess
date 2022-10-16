import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    fontSize: (props: { size: number }) => props.size,
  },
});
