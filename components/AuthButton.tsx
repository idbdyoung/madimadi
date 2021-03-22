import { useContext } from 'react';
import styled from 'styled-components';

import { authContext } from './ProvideAuth';
import { modalContext } from './ProvideModal';

import UserBox from '../components/UserBox';
import Button from '../components/Button';
import Login from '../components/Login';

const useAuth = () => useContext(authContext);
const useModal = () => useContext(modalContext);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AuthButton: React.FC = () => {
  const auth = useAuth();
  const modal = useModal();

  return (
    <Container>
      {
        auth.user ? (
          <UserBox />
        ) : (
          <Button
            text='Login'
            onClick={() => modal.openModal(<Login />)}
          />
        )
      }
    </Container>
  );
};

export default AuthButton;
