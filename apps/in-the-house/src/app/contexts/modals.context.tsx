import * as React from 'react';
import { ModalData } from '@in-the-house/ui';

export interface ModalsProviderProps {
  children: React.ReactNode|React.ReactNode[],
}

export const ModalsContext = React.createContext(null);

export function ModalsProvider(props: ModalsProviderProps) {
  const [modals, setModals] = React.useState<ModalData[]>([]);
  // expose functions for add error, delete error:
  const addModal = (modal: ModalData) => {
    // custom behaviour - loop over all modals and remove
    // dismissable ones. This will prevent a stack of messages
    // building up over time, but will retain the undismissible
    // messages.
    const persistentModals = modals.filter(m => !m.isDismissible);
    setModals([...persistentModals, modal]);
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

  return <ModalsContext.Provider value={{
    modals,
    addModal,
    deleteModal,
  }}>
    {props.children}
  </ModalsContext.Provider>
}