import { createUseStyles } from 'react-jss';
import { colors } from 'theme';
import { rgba } from 'helpers';

export default createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: [16, 32],
    backgroundColor: colors.GREEN,
    borderRadius: 12,
    fontSize: 16,
    color: 'white',
    transitionProperty: 'color, background-color',
    transition: '0.25s ease-in-out',

    '&:hover, &:focus': {
      backgroundColor: colors.GREEN_HOVER,
    },

    '&:active': {
      backgroundColor: colors.GREEN_ACTIVE,
    },

    '&:disabled': {
      backgroundColor: rgba(colors.GREEN, 0.5),
      cursor: 'default',
    },
  },

  loader: {
    marginRight: 8,
  },
});
