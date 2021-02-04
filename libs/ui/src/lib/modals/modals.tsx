import React from 'react';

// INDIVIDUAL MODAL:
export interface ModalProps {
  closeModal(): any,
  modal: ModalData,
}

export function Modal({ modal, closeModal }: ModalProps) {
  return (
    <div className={`modal modal--${modal.type}`}>
      { modal.isDismissible && <button onClick={closeModal}>x</button> }
      <p className="modal__pre-title">{modal.type}</p>
      <h3>{modal.name} - {modal.code}</h3>
      <p className="modal__message">{modal.message}</p>
    </div>
  );
}

// MODALS:
export interface ModalData {
  name: string,
  code: number,
  type: 'success'|'info'|'warning'|'error',
  message: string,
  isDismissible: boolean,
}

export interface ModalsProps {
  closeModal(): any,
  modals: ModalData[],
}

export function Modals({ modals, closeModal }: ModalsProps) {
  return modals.length <= 0 ? null : (
    <aside>
      <Modal modal={modals[modals.length - 1]} closeModal={closeModal} />
    </aside>
  );
}


export default Modals;
