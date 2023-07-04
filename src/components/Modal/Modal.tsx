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
  const { 
    register, 
    handleSubmit,
    formState: { errors }
} = useForm<Car>({
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
    reValidateMode: "onChange"
  });

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
            <div className='input-wrapper'>
              <input
                {...register('car', {
                  required: isAddCar && "Fill this field",
                })}
                placeholder='Company'
                className='input'
                type='text'
                disabled={!isAddCar}
              />
               <p className='tittle form-error'>{errors.car?.message}</p>
            </div>
            <label className='modal-item__text'>Company</label>
          </div>

          <div className='modal-item'>
            <div className='input-wrapper'>
              <input
                {...register('car_model', {
                  required: isAddCar && "Fill this field",
                })}
                placeholder='Model'
                className='input'
                type='text'
                disabled={!isAddCar}
              />
               <p className='tittle form-error'>{errors.car_model?.message}</p>
            </div>
            <label className='modal-item__text'>Model</label>
          </div>

          <div className='modal-item'>
            <div className='input-wrapper'>
              <input
                {...register('car_vin', {
                    required: isAddCar && "Fill this field",
                    maxLength: {
                      value: 17,
                      message: 'You entered more than 17 characters',
                    },
                    minLength: {
                      value: 17,
                      message: 'You entered less than 17 characters',
                    }
                  })}
                  placeholder='VIN'
                  className='input'
                  disabled={!isAddCar}
                />
              <p className='tittle form-error'>{errors.car_vin?.message}</p>
            </div>
            <label className='modal-item__text'>VIN</label>    
          </div>

          <div className='modal-item'>
            <div className='input-wrapper'>
              <input
                {...register('car_model_year', {
                  required: isAddCar && "Fill this field",
                  min: {
                    value: 1991,
                    message: 'You can add a car from 1991 year'
                  },
                  max: {
                    value: 2023,
                    message: "We can't travel to the future...)"
                  },
                })}
                placeholder='Year'
                className='input'
                type='number'
                disabled={!isAddCar}
              />
              <p className='tittle form-error'>{errors.car_model_year?.message}</p>
            </div>
            
            <label className='modal-item__text'>Year</label>
          </div>

          <div className='modal-item'>
            <div className='input-wrapper'>
              <input
                {...register('car_color', {
                  required: isAddCar && "Fill this field",
                })}
                placeholder='Color'
                className='input'
                type='text'
              />
              <p className='tittle form-error'>{errors.car_color?.message}</p>
            </div>
            <label className='modal-item__text'>Color</label>
          </div>

          <div className='modal-item'>
            <div className='input-wrapper'>
              <input
                {...register('price', {
                  required: isAddCar && "Fill this field",
                  min: {
                    value: 1000,
                    message: 'The minimum price starts at $1000'
                  }
                })}
                placeholder='Price'
                className='input'
                type='number'
              />
              <p className='tittle form-error'>{errors.price?.message}</p>
            </div>
            <label className='modal-item__text'>Price</label>
          </div>

          <div className='modal-item'>
            <div className='input-wrapper input-wrapper__checkbox'>
              <input
                {...register('availability', {
                  required: isAddCar && "Fill this field",
                })}
                id='Availability'
                type='checkbox'
                className='checkbox'
              />
              <p className='tittle form-error'>{errors.availability?.message}</p>
            </div>
            
            <label htmlFor='Availability' className='checkbox'>
              Availability
            </label>
          </div>
        </section>
        <footer className='modal-card-foot'>
          <button 
            type='submit' 
            className='button is-success'
          >
            Save
          </button>
        </footer>
      </div>
    </form>
  );
};
