import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import Modal from './Modal';

interface ModalType {
  isModalOpen: boolean;
  modalComponent: any;
  openModal: (...any: any) => any;
  closeModal: (...any: any) => any;
}

const initialContext = {
  isModalOpen: false,
  openModal: (props: any) => {},
  closeModal: () => {},
};

export const modalContext = createContext(initialContext);
export const useModal = () => useContext(modalContext);

const useProvideModal = (): ModalType => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState();

  const openModal = (node: any) => {
    setModalOpen(true);
    setModalComponent(node);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    isModalOpen,
    modalComponent,
    openModal,
    closeModal,
  };
};

const ProvideModal: React.FC = ({ children }) => {
  const modal = useProvideModal();

  return (
    <modalContext.Provider value={modal}>
      {
        modal.isModalOpen &&
        <Modal>
          {
            modal.modalComponent
          }
        </Modal>
      }
      {
        children
      }
    </modalContext.Provider>
  );
};

export default ProvideModal;
