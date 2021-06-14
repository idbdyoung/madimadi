import axios from './index';

interface TokenPostBodyType {
  tokenId: string;
}

export const authAPI = (body: TokenPostBodyType) => axios.post('api/auth', body);
export const loginAPI = (body: TokenPostBodyType) => axios.post('api/auth/login', body);
export const logoutAPI = () => axios.get('api/auth/logout');
