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
    display: 'flex',
    flexDirection: 'column-reverse',
    gap: 8,
    marginTop: 16,
  },

  item: {
    ...gridStyles,
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
