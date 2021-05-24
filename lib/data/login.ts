import jwt from 'jsonwebtoken';
import endpoint from '../../endpoint';

const login = (userId: string | string[]) => {
  try {
  } catch (error) {
  }
  const userToken = jwt.sign(
    { data: userId },
    endpoint.JWT_SECRET,
  );
  const userData = {
    userName: 'idbd'
  };

  return {
    userToken,
    userData,
  };
};

export default login;
