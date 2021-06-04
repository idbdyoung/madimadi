import { NextApiRequest } from 'next';

import redis from '../../../lib/redis';
import verify, { NextApiResponseWithAccessToken } from '../../../lib/utils/verifyAccessToken';

const logout = async (req: NextApiRequest, res: NextApiResponseWithAccessToken) => {
  if (req.method === 'GET') {
    try {
      redis.del(res.accessToken);
      res.setHeader('Set-Cookie','madimadi=deleted; path=/;');
      res.statusCode = 200;

      return res.end();
    } catch (e) {
      console.log(e);

      return res.end();
    }
  }
};

export default verify(logout);
