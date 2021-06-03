import axios from './index';
import { MadiBodyType } from '../../types/madi';

export const getMadi = (index: number) => axios.get(`api/madi?index=${index}`);
export const postMadi = (body: MadiBodyType) => axios.post(`api/madi`, body, { withCredentials: true });
