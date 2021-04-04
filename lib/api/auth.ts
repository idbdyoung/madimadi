import axios from './index';

interface LoginApiBody {
  tokenId: string;
}

export const authAPI = () => axios.get('api/auth');
export const loginAPI = (body: LoginApiBody) => axios.post('api/auth', body);
