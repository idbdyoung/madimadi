import { NextApiRequest } from 'next';

import { getAsyncRedis } from '../../../lib/redis';
import { NextApiResponseWithAccessToken, verifyAccessToken } from '../../../lib/utils/verifyAccessToken';

const auth = async (req: NextApiRequest, res: NextApiResponseWithAccessToken) => {
  if (req.method === 'POST') {
    try {
      const { tokenId } = req.body;
      const accessToken = verifyAccessToken(tokenId);

      if (!accessToken) {
        res.statusCode = 401;
        return res.end();
      }

      const result = await getAsyncRedis(accessToken);

      if (!result) {
        res.statusCode = 401;
        return res.end();
      }
      const userData = JSON.parse(result);

      return res.send(userData);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;

      return res.end();
    }
  }
};

export default auth;
