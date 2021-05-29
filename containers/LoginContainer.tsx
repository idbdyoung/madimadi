import { useDispatch } from 'react-redux';

import { loginAPI } from '../lib/api/auth';
import { AuthAction } from '../store/auth';
import { useModal } from '../components/Modal/ProvideModal';

import Login from '../components/Login';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const modal = useModal();

  const onSuccess = async (response: any) => {
    modal.closeModal();

    try {
      const { tokenId } = response;
      const { data } = await loginAPI({ tokenId });

      if (!data) {
        throw new Error();
      }

      return dispatch(AuthAction.setLoggedIn(data));
    } catch (error) {
      console.log(error);
    }
  };
  const onFailure = () => {
    modal.closeModal();
    alert('로그인에 실패했습니다.');
  };
  const onCloseModal = () => {
    modal.closeModal();
  };

  return (
    <Login
      onSuccess={onSuccess}
      onFailure={onFailure}
      onCloseModal={onCloseModal}
    />
  );
};

export default LoginContainer;
