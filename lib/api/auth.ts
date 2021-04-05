import axios from './index';

interface LoginApiBody {
  tokenId: string;
}

export const authAPI = () => axios.get('api/auth');
export const loginAPI = (body: LoginApiBody) => axios.post('api/auth/login', body);
export const logoutAPI = () => axios.get('api/auth/logout');
