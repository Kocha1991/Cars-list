import React from 'react'
import './SearchCar.scss'

type Props = {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const SearchItems: React.FC<Props> = ({
  handleFilter,
}) => {
  return (
    <div className="control is-loading">
      <input 
        className="input" 
        type="text" 
        placeholder="Search car"
        onChange={handleFilter}
      />
    </div>
  )
}