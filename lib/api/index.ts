import Axios from 'axios';

import endpoint from '../../endpoint';

const axios = Axios.create({
  baseURL: endpoint.API_URL,
});

export default axios;
