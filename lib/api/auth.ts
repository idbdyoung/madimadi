import axios from './index';

interface TokenBodyType {
  tokenId: string;
}

export const authAPI = (body: TokenBodyType) => axios.post('api/auth', body);
export const loginAPI = (body: TokenBodyType) => axios.post('api/auth/login', body);
export const logoutAPI = () => axios.get('api/auth/logout');
