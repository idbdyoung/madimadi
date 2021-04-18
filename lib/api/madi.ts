import axios from './index';

export const getMadi = (index: number) => axios.get(`api/madi?index=${index}`);
