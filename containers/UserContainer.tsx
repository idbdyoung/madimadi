import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

import { useSelector } from '../store';

import { useModal } from '../components/Modal/ProvideModal';
import LoginContainer from '../containers/LoginContainer';
import BlueButton from '../components/BlueButton';
import UserBox from '../components/Header/UserBox';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .join-button-wrapper {
    width: 80px;
    height: 32px;
  }
  .alert-invalid-token-error {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: red;
    font-size: 10px;
  }
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
        <div className='join-button-wrapper'>
          <BlueButton
            text='Join'
            onClick={onClickGetLogin}
            borderRadius={60}
          />
        </div>
      }
      {
        auth.isInvalidToken &&
        <div className='alert-invalid-token-error'>
          유효하지 않은 토큰입니다. 다시 로그인해 주세요.
        </div>
      }
    </Container>
  );
};

export default UserContainer;
