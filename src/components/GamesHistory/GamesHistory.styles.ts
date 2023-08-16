import { createUseStyles } from 'react-jss';
import { colors } from '@/theme';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '200px repeat(2, 1fr)',
};

export default createUseStyles({
  root: {},

  heading: {
    marginBottom: 24,
  },

  header: {
    ...gridStyles,

    fontWeight: 'bold',
  },

  list: {
    marginTop: 16,
  },

  item: {
    ...gridStyles,

    '&:not(:first-child)': {
      marginTop: 8,
    },
  },

  bold: {
    fontWeight: 'bold',
  },

  win: {
    color: colors.GREEN,
  },

  loss: {
    color: colors.RED,
  },

  draw: {
    color: colors.GRAY,
  },

  chart: {
    maxWidth: 1000,
    marginTop: 40,
  },
});
