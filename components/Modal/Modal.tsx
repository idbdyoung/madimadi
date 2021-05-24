import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import { modalContext } from './ProvideModal';

const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const Modal: React.FC = ({ children }) => {
  const modal = useContext(modalContext);
  const modalContainer = useRef<HTMLDivElement>(null);

  const onClick = (e: React.MouseEvent) => {
    if (e.target === modalContainer.current) {
      return modal.closeModal();
    }
  };

  return (
    <Container
      ref={modalContainer}
      onClick={onClick}
    >
      {
        children
      }
    </Container>
  );
};

export default Modal;
