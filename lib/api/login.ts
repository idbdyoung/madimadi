import axios from './index';

export const loginAPI = () => axios.get('api/auth/login')