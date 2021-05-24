import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import jwt from 'jsonwebtoken';

import endpoint from '../../../endpoint';
import Redis from '../../../lib/redis';

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const access_token = req.headers.cookie;

      if (!access_token || access_token === endpoint.TOKEN_DELETED) {
        return res.end();
      }
      const { data } = (<any>jwt.verify(access_token, endpoint.JWT_SECRET));

      if (!data) {
        res.statusCode = 400;
        return res.end();
      }
      Redis.get(access_token, async (err, reply) => {
        if (err) throw err;
        res.statusCode = 200;
        return res.send(reply);
      });
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.end();
    }
  }
};

export default auth;
