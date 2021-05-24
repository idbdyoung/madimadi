import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

import { useSelector } from '../store';

import { useModal } from '../components/Modal/ProvideModal';
import LoginContainer from '../containers/LoginContainer';
import BlueButton from '../components/BlueButton';
import UserBox from '../components/Header/UserBox';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const UserContainer: React.FC = () => {
  const auth = useSelector(state => state.auth);
  const modal = useModal();
  const router = useRouter();

  const onClickMoveUserPage = () => {
    router.push({
      pathname: `/user/${auth.user?.userName}`
    });
  };
  const onClickGetLogin = () => {
    modal.openModal(<LoginContainer />);
  };

  return (
    <Container>
      {
        auth.isLoggedIn ?
        <UserBox
          auth={auth}
          onClick={onClickMoveUserPage}
        /> :
        <BlueButton
          text='Join'
          onClick={onClickGetLogin}
        />
      }
    </Container>
  );
};

export default UserContainer;