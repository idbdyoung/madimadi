import axios from './index';
import { MadiPostBodyType, MadiLikePostBodyType } from '../../types/madi';

export const getMadi = (index: number) => axios.get(`api/madi?index=${index}`);
export const postMadi = (body: MadiPostBodyType) => axios.post(`api/madi/post`, body, { withCredentials: true });
export const postMadiLike = (body: MadiLikePostBodyType) => axios.post(`api/madi/like/post`, body, { withCredentials: true });
export const deleteMadiLike = (id: number) => axios.delete(`api/madi/like/${id}`, { withCredentials: true });
