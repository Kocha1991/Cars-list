import React from 'react';
import { SelectOptions } from '../../App';

type Props = {
  modal: boolean
  onCloseModal: () => void
  selected: SelectOptions
}

export const ModalDelete: React.FC<Props> = ({
  modal,
  onCloseModal,
  selected
}) => {
  return (
    <div className={`modal ${(modal && selected === SelectOptions.Delete) && 'is-active'}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button 
            className="delete"
            aria-label="close"
            onClick={onCloseModal}
          ></button>
        </header>
        <section className="modal-card-body">
          delete
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  )
}
