import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';

import Data from '../../../lib/data';
import Redis from '../../../lib/redis';
import endpoint from '../../../endpoint';

const googleClient = new OAuth2Client(endpoint.GOOGLE_CLIENT_ID);

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { tokenId } = req.body;
      const ticket = await googleClient.verifyIdToken({
        idToken: tokenId,
        audience: endpoint.GOOGLE_CLIENT_ID,
      });
      const userId = ticket.getUserId();

      if (!userId) return;
      const { userToken, userData } = await Data.login(userId);
      Redis.get(userToken, async (err, reply) => {
        if (err) throw err;

        if (reply !== null) {
          //중복시 처리
          console.log('중복!');
        }

        if (reply === null) {
          const sUserData = JSON.stringify(userData);
          Redis.set(userToken, sUserData);
          res.setHeader('Set-Cookie', `madimadi=${userToken}; path=/;`);
          res.statusCode = 200;

          return res.send(sUserData);
        }
      });
    } catch (e) {
      res.statusCode = 500;

      return res.send(e);
    }
  }
};

export default login;
