import axios from './index';
import { MadiBodyType, MadiLikeBodyType } from '../../types/madi';

export const getMadi = (index: number) => axios.get(`api/madi?index=${index}`);
export const postMadi = (body: MadiBodyType) => axios.post(`api/madi/post`, body, { withCredentials: true });
export const postMadiLike = (body: MadiLikeBodyType) => axios.post(`api/madi/like/post`, body, { withCredentials: true });
export const deleteMadiLike = (id: number) => axios.delete(`api/madi/like/${id}`, { withCredentials: true });
