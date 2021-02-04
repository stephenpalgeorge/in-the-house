import * as React from 'react';
import { ModalData } from '@in-the-house/ui';

export interface ModalsProviderProps {
  children: React.ReactNode|React.ReactNode[],
}

export function ModalsProvider(props: ModalsProviderProps) {
  const [modals, setModals] = React.useState<ModalData[]>([]);
  const ModalsContext = React.createContext(null);
  // expose functions for add error, delete error:
  const addModal = (modal: ModalData) => {
    setModals([...modals, modal]);
  }

  const deleteModal = (modalName: string) => {
    const index = modals.map(m => m.name).indexOf(modalName);
    if (index === -1) {
      console.warn('tried to remove a modal that doesn\'t exist...');
      return;
    }

    const subset: ModalData[] = [...modals.slice(0, index), ...modals.slice(index + 1)];
    setModals(subset);
  }

  return <ModalsContext.Provider value={[
    modals,
    addModal,
    deleteModal,
  ]}>
    {props.children}
  </ModalsContext.Provider>
}