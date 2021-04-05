import { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

import UserPageIcon from '../public/static/images/userPage.svg';
import { authContext } from './ProvideAuth';

import Logout from '../components/Logout';

const useAuth = () => useContext(authContext);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .user-page {
    margin-right: 10px;
    cursor: pointer;
  }
`;

const UserBox: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();

  const onClick = () => {
    router.push({
      pathname: `/user/${auth.user}`
    });
  };

  return (
    <Container>
      <UserPageIcon
        className='user-page'
        onClick={onClick}
      />
      <Logout />
    </Container>
  );
};

export default UserBox;
