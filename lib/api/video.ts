import { VideoPostBodyType } from '../../types/video';
import axios from './index';

export const getVideos = (index: number) => axios.get(`api/video?index=${index}`);
export const postVideo = (body: VideoPostBodyType) => axios.post(`api/video/post`, body, { withCredentials: true });
