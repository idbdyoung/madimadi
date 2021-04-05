import { useContext } from 'react';
import styled from 'styled-components';

import { logoutAPI } from '../lib/api/auth';
import { authContext } from './ProvideAuth';

const useAuth = () => useContext(authContext);

const Container = styled.div`
  .logout-button {
    cursor: pointer;
    font-size: 16px;
  }
  .logout-button :hover {
    opacity: 0.7;
  }
`;

const Logout: React.FC = () => {
  const auth = useAuth();

  const onClick = async () => {
    await logoutAPI();
    auth.signOut();
  };

  return (
    <Container onClick={onClick}>
      <div className='logout-button'>
        Logout
      </div>
    </Container>
  );
};

export default Logout;
