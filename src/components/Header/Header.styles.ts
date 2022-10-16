import { createUseStyles } from 'react-jss';
import { colors, linkStyles } from 'theme';

export default createUseStyles({
  root: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    borderBottom: [1, 'solid', colors.LIGHT_GRAY],
    zIndex: 100,
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [16, 0],
  },

  menu: {
    display: 'flex',
  },

  menuItem: {
    fontWeight: 'bold',
    borderBottom: [2, 'solid', 'transparent'],

    '&:not(:first-child)': {
      marginLeft: 16,
    },
  },

  activeMenuItem: {
    borderColor: colors.GREEN,
    color: colors.BLACK,
    cursor: 'default',
  },

  menuLink: {
    ...linkStyles,
  },

  accountSection: {
    display: 'flex',
    alignItems: 'center',
  },

  loginLink: {
    fontWeight: 'bold',

    ...linkStyles,
  },
});
