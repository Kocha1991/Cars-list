import React, { useState } from 'react'
import classNames from 'classnames'
import { SelectOptions } from '../../App'
import { Car } from '../../types/car'

type Props = {
  car: Car | undefined
  rowId: number | null
  modal: boolean
  onCloseModal: () => void
  selected: SelectOptions
}

export const ModalEdit: React.FC<Props> = ({
  modal,
  onCloseModal,
  selected,
  car,
  rowId,

}) => {
  // const [color, setColor] = useState<string>(car.color);
  
  // const handleSave = () => {
  //   // Save the updated data
  //   const updatedCar = {
  //     ...car,
  //     color,
  //     price,
  //     availability,
  //   };
  //   // onSave(updatedCar);
  // };
 
  return (
    <div key={rowId} className={classNames('modal', {
      'is-active': modal && selected === SelectOptions.Edit
    })}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Edit car
          </p>
          <button 
            className="delete" 
            aria-label="close"
            onClick={onCloseModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className='modal-item'>
            <input
              className='input'
              type="text" 
              value={car?.car} 
              disabled 
            />
            <label className='modal-item__text'>Company</label>
          </div>
          <div className='modal-item'>
            <input 
              className='input'
              type="text" 
              value={car?.car_model} 
              disabled 
            />
            <label className='modal-item__text'>Model</label>
          </div>
          <div className='modal-item'>
            <input 
              className='input'
              type="text" 
              value={car?.car_vin} 
              disabled 
            />
            <label className='modal-item__text'>VIN</label>
          </div>
          <div className='modal-item'>
            <input 
              className='input'
              type="text" 
              value={car?.car_model_year} 
              disabled 
            />
            <label className='modal-item__text'>Year</label>
          </div>
          <div className='modal-item'>
            <input 
              className='input'
              type="text" 
              // value={color}
              // onChange={(e) => setColor(e.target.value)}
            />
            <label className='modal-item__text'>Color</label>
          </div>
          <div className='modal-item'>
            <input
              className='input'
              type="text" 
            />
            <label className='modal-item__text'>Price</label>
          </div>
          <div className='modal-item'>
            <input 
              id='Availability' 
              type="checkbox" 
              className='checkbox'/>
            <label 
              htmlFor='Availability' 
              className='checkbox'
            >
              Availability
            </label>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
        </footer>
      </div>
    </div>
  )
}