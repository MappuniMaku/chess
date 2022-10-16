import { createUseStyles } from 'react-jss';
import { colors } from 'theme';

export default createUseStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  accountButton: {
    display: 'flex',
    alignItems: 'center',
    color: colors.GRAY,
    transition: 'color 0.25s ease-in-out',

    '&:hover, &:focus': {
      color: colors.GREEN,
    },
  },

  account: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 8,
  },

  username: {
    fontSize: 14,
    color: colors.BLACK,
  },

  rating: {
    marginTop: 2,
    fontSize: 12,
    color: colors.GRAY,
  },

  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    paddingTop: 8,
  },
});
