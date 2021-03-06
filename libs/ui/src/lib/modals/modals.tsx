import React from 'react';

// INDIVIDUAL MODAL:
export interface ModalProps {
  closeModal(name: string): any,
  modal: ModalData,
}

export function Modal({ modal, closeModal }: ModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    let timeout = setTimeout(() => {
      if (modal.isDismissible) closeModal(modal.name);
    }, 4000);

    const handleKeyup = e => {
      if (e.keyCode === 27) closeModal(modal.name);
    }
    document.addEventListener('keyup', handleKeyup);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('keyup', handleKeyup);
    }
  }, []);
  return (
    <div ref={modalRef} className={`modal modal--${modal.type}`} data-status={modal.type}>
      {
        modal.isDismissible &&
        <button onClick={() => closeModal(modal.name)}>
          <div className="close-icon--bar"></div>
          <div className="close-icon--bar"></div>
        </button>
      }
      <p className="font-size--h4 font-family--serif font-weight--heavy">{modal.name} - {modal.code}</p>
      <p className="modal__message font-family--sans-serif">{modal.message}</p>
    </div>
  );
}

// MODALS:
export interface ModalData {
  name: string,
  code?: number,
  type: 'success' | 'info' | 'warning' | 'error',
  message: string,
  isDismissible: boolean,
}

export interface ModalsProps {
  closeModal(name: string): any,
  modals: ModalData[],
}

export function Modals({ modals, closeModal }: ModalsProps) {
  return modals.length <= 0 ? null : (
    <aside className="modals contents contents--narrow">
      <Modal modal={modals[modals.length - 1]} closeModal={closeModal} />
    </aside>
  );
}

export default Modals;
