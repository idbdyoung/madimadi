import { NextApiRequest, NextApiResponse } from 'next';

import Data from '../../../../lib/data';
import endpoint from '../../../../endpoint';

const google = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id } = req.body;
    const loginToken = Data.login(id);
    res.setHeader('Set-Cookie', `madimadi=${loginToken}; path=/;`);
    res.statusCode = 200;
    res.redirect(endpoint.API_URL);
  }
};

export default google;
