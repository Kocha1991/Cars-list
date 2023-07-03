import React from 'react';
import classNames from 'classnames';
import { Car } from '../../types/car';
import './Modal.scss';

type Props = {
  car: Car
  onCloseModal: () => void
  onRemoveCar: () => void
}

export const ModalDelete: React.FC<Props> = ({
  onCloseModal,
  onRemoveCar,
  car,
}) => {
  return (
    <div className={classNames('modal is-active')}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head"/>
        <section className="modal-card-body">
          <p className='title title__delete'>
            Are you sure you want to remove this car?
          </p>
          <span className='title'>{car?.car}</span>
          <br/>
          <span className='title'>{car?.car_model}</span>
          <br/>
          <span className='title'>{`Vin: ${car?.car_vin}`}</span>
        </section>
        <footer className="modal-card-foot">
          <button 
            className="button is-success"
            onClick={onRemoveCar}
          >
            Yes
          </button>
          <button 
            className="button"
            onClick={onCloseModal}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  )
}
