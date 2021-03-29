import jwt from 'jsonwebtoken';
import endpoint from '../../endpoint';

const login = (userId: string | string[]) => {
  //await 비즈니스로직
  try {
  } catch (error) {
  }
  const token = jwt.sign(
    { data: userId },
    endpoint.JWT_SECRET,
  );
  return token;
};

export default login;
