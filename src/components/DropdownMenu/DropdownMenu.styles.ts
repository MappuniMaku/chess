import { createUseStyles } from 'react-jss';
import { boxShadows, colors } from 'theme';

export default createUseStyles({
  root: {
    backgroundColor: 'white',
    border: [1, 'solid', colors.LIGHT_GRAY],
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: boxShadows.LIGHT,
  },

  list: {},

  item: {
    '&:not(:first-child)': {
      borderTop: [1, 'solid', colors.LIGHT_GRAY],
    },
  },

  button: {
    minWidth: 250,
    padding: [12, 16],
    transition: 'background-color 0.25s ease-in-out',

    '&:hover, &:focus': {
      backgroundColor: colors.LIGHTEST_GRAY,
    },
  },
});
