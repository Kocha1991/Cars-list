import React from 'react';
import './SearchCar.scss';

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchItems: React.FC<Props> = ({
  handleSearch: handleFilter,
}) => {
  return (
    <input
      className='input'
      type='text'
      placeholder='Search car'
      onChange={handleFilter}
    />
  );
};
