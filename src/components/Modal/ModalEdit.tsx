import React from 'react'
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
  rowId
}) => {
  return (
    <div key={rowId} className={classNames('modal', {
      'is-active': modal && selected === SelectOptions.Edit
    })}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {`${car?.car_model} - Vin ${car?.car_vin}`}
          </p>
          <button 
            className="delete" 
            aria-label="close"
            onClick={onCloseModal}
          ></button>
        </header>
        <section className="modal-card-body">
         edit
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
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