import React from 'react';
import { useForm } from 'react-hook-form';

import { Car } from '../../types/car';

type Props = {
  car?: Car | undefined;
  onCloseModal: () => void;
  onSubmit: (car: Car) => void;
  isAddCar: boolean;
};

export const Modal: React.FC<Props> = ({
  onCloseModal,
  onSubmit,
  car,
  isAddCar,
}) => {
  const { register, handleSubmit } = useForm<Car>({
    defaultValues: {
      availability: car?.availability,
      car: car?.car ?? '',
      car_color: car?.car_color ?? '',
      car_model: car?.car_model ?? '',
      car_model_year: car?.car_model_year ?? 0,
      car_vin: car?.car_vin ?? '',
      id: car?.id ?? new Date().getTime(),
      price: car?.price ?? '0',
    },
  });

  console.log(car);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className='modal is-active'
    >
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Add car</p>
          <button
            className='delete'
            aria-label='close'
            onClick={onCloseModal}
          ></button>
        </header>
        <section className='modal-card-body'>
          <div className='modal-item'>
            <input
              {...register('car')}
              placeholder='Company'
              className='input'
              type='text'
              disabled={!isAddCar}
            />
            <label className='modal-item__text'>Company</label>
          </div>
          <div className='modal-item'>
            <input
              {...register('car_model')}
              placeholder='Model'
              className='input'
              type='text'
              disabled={!isAddCar}
            />
            <label className='modal-item__text'>Model</label>
          </div>
          <div className='modal-item'>
            <input
              {...register('car_vin')}
              placeholder='VIN'
              className='input'
              type='namber'
              disabled={!isAddCar}
            />
            <label className='modal-item__text'>VIN</label>
          </div>
          <div className='modal-item'>
            <input
              {...register('car_model_year')}
              placeholder='Year'
              className='input'
              type='number'
              disabled={!isAddCar}
            />
            <label className='modal-item__text'>Year</label>
          </div>
          <div className='modal-item'>
            <input
              {...register('car_color')}
              placeholder='Color'
              className='input'
              type='text'
            />
            <label className='modal-item__text'>Color</label>
          </div>
          <div className='modal-item'>
            <input
              {...register('price')}
              placeholder='Price'
              className='input'
              type='number'
            />
            <label className='modal-item__text'>Price</label>
          </div>
          <div className='modal-item'>
            <input
              {...register('availability')}
              id='Availability'
              type='checkbox'
              className='checkbox'
            />
            <label htmlFor='Availability' className='checkbox'>
              Availability
            </label>
          </div>
        </section>
        <footer className='modal-card-foot'>
          <button onClick={onCloseModal} className='button is-success'>
            Save
          </button>
        </footer>
      </div>
    </form>
  );
};
