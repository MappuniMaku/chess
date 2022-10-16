import { linkStyles } from './misc';

export const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  element: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },

  link: {
    ...linkStyles,
  },
};
