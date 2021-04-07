import { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

import { authContext } from './ProvideAuth';

import UserPageIcon from '../public/static/images/userPage.svg';
import DropDownMenu from './DropDown/DropDownMenu';

const useAuth = () => useContext(authContext);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  .user-page {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    :hover {
      opacity: 0.7;
    }
    .user-page-icon {
      margin-right: 10px;
    }
  }
`;

const UserBox: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();
  const { userName } = auth.user;

  const onClick = () => {
    router.push({
      pathname: `/user/${userName}`
    });
  };

  return (
    <Container>
      <div
        className='user-page'
        onClick={onClick}
      >
        <UserPageIcon className='user-page-icon'/>
        { userName }
      </div>
      <DropDownMenu />
    </Container>
  );
};

export default UserBox;
