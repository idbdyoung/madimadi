import { useDispatch } from 'react-redux';

import { logoutAPI } from '../lib/api/auth';
import { AuthAction } from '../store/auth';

import Logout from '../components/Logout';

const LogoutContainer: React.FC = () => {
  const dispatch = useDispatch();

  const onClick = async () => {
    try {
      await logoutAPI();
      dispatch(AuthAction.setLoggedOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Logout onClick={onClick}/>
  );
};

export default LogoutContainer;
