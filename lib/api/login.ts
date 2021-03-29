import axios from './index';

interface LoginApiBody {
  id: string;
}

export const loginAPI = (body: LoginApiBody) => axios.post('api/auth/callback', body);
