import React, { useState } from 'react'
import classNames from 'classnames'
import { Car } from '../../types/car'

type Props = {
  addCar: boolean
  onCloseModal: () => void
  cars: Car[]
  saveCar: (newCar: Car) => void
}

export const ModallAdd: React.FC<Props> = ({
  addCar,
  onCloseModal,
  saveCar
}) => {
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [company, setCompany] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<number| null>(null)
  const [vin, setVin] = useState<number| null>(null)
  const [price, setPrice] = useState<number | null>(null)

  const idNewCar = new Date();

  const newCar: Car = {
    availability:!!availability,
    car: company,
    car_color: color,
    car_model: model,
    car_model_year: year ?? 0,
    car_vin: String(vin ?? 0),
    id: idNewCar.getTime(),
    price: String(price ?? 0),
  }
  

  return (
    <form 
      className={classNames('modal', {'is-active': addCar})}
    >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Add car
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
              onChange={(e) => setCompany(e.target.value)}
            />
            <label className='modal-item__text'>Company</label>
          </div>
          <div className='modal-item'>
            <input 
              className='input'
              type="text" 
              onChange={(e) => setModel(e.target.value)}
            />
            <label className='modal-item__text'>Model</label>
          </div>
          <div className='modal-item'>
            <input 
              className='input'
              type="text" 
              onChange={(e) => setVin(Number(e.target.value))}
            />
            <label className='modal-item__text'>VIN</label>
          </div>
          <div className='modal-item'>
            <input 
              className='input'
              type="text" 
              onChange={(e) => setYear(Number(e.target.value))}
            />
            <label className='modal-item__text'>Year</label>
          </div>
          <div className='modal-item'>
            <input 
              className='input'
              type="text" 
              onChange={(e) => setColor(e.target.value)}
            />
            <label className='modal-item__text'>Color</label>
          </div>
          <div className='modal-item'>
            <input
              className='input'
              type="text" 
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <label className='modal-item__text'>Price</label>
          </div>
          <div className='modal-item'>
            <input 
              id='Availability' 
              type="checkbox" 
              className='checkbox'
            />
            <label 
              htmlFor='Availability' 
              className='checkbox'
            >
              Availability
            </label>
          </div>
        </section>
        
      </div>
    </form>
  )
}