import jwt from 'jsonwebtoken';
import endpoint from '../../endpoint';

const login = (userId: string | string[]) => {
  //비즈니스로직
  try {
  } catch (error) {
  }
  const userToken = jwt.sign(
    { data: userId },
    endpoint.JWT_SECRET,
  );
  const userInfo = {};
  return {
    userToken,
    userInfo,
  };
};

export default login;
