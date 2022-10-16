import React, { FC } from 'react';

import { IUsersFilters } from 'types';
import { Icon } from 'components';

import useStyles from './HeadingButton.styles';

interface IHeadingButtonProps {
  heading: string;
  filterKey: 'username' | 'rating';
  filters: IUsersFilters;
  isDisabled: boolean;
  onFiltersChange: (filters: IUsersFilters) => void;
}

export const HeadingButton: FC<IHeadingButtonProps> = ({
  heading,
  filterKey,
  filters,
  isDisabled,
  onFiltersChange,
}) => {
  const classes = useStyles();

  const ascValue: IUsersFilters['sort'] = `${filterKey}_asc`;
  const descValue: IUsersFilters['sort'] = `${filterKey}_desc`;

  const selectedSortOption = filters.sort;
  const isAsc = selectedSortOption === ascValue;
  const isDesc = selectedSortOption === descValue;

  return (
    <button
      className={classes.root}
      type="button"
      disabled={isDisabled}
      onClick={() =>
        onFiltersChange({
          ...filters,
          sort: isAsc ? descValue : ascValue,
        })
      }
    >
      <span>{heading}</span>
      {(isAsc || isDesc) && <Icon type={isAsc ? 'expand_less' : 'expand_more'} />}
    </button>
  );
};
