import React from 'react';

import './Button.scss'

type Props = {
  onAddCar: () => void
}

export const Button:React.FC<Props> = ({
  onAddCar,
}) => {
  return (
    <button
      className='button is-success'
      onClick={onAddCar}
    >
      Add car
    </button>
  )
}
