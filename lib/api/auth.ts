import axios from './index';

interface TokenBody {
  tokenId: string;
}

export const authAPI = (body: TokenBody) => axios.post('api/auth', body);
export const loginAPI = (body: TokenBody) => axios.post('api/auth/login', body);
export const logoutAPI = () => axios.get('api/auth/logout');
