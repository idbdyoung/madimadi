import styled from 'styled-components';

import { AuthState } from '../../types/reduxState';
import UserPageIcon from '../../public/static/images/userPage.svg';

import DropDownContainer from '../../containers/DropDownContainer';

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

interface Iprops {
  auth: AuthState;
  onClick: (...any: any) => any;
}

const User: React.FC<Iprops> = ({ auth, onClick }) => {
  return (
    <Container>
      <div
        className='user-page'
        onClick={onClick}
      >
        <UserPageIcon className='user-page-icon'/>
        {
          auth.user?.userName
        }
      </div>
      <DropDownContainer />
    </Container>
  );
};

export default User;
