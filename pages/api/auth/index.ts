import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import redis from 'redis';
import jwt from 'jsonwebtoken';

import Data from '../../../lib/data';
import endpoint from '../../../endpoint';

const redisClient = redis.createClient('redis://localhost:6379');
const googleClient = new OAuth2Client(endpoint.GOOGLE_CLIENT_ID);

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const access_token = req.headers.cookie;

      if (!access_token) {
        res.statusCode = 400;

        return res.end();
      }
      const userId = jwt.verify(access_token, endpoint.JWT_SECRET);

      return res.send(userId);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;

      return res.end();
    }
  }

  if (req.method === 'POST') {
    try {
      const { tokenId } = req.body;
      const ticket = await googleClient.verifyIdToken({
        idToken: tokenId,
        audience: endpoint.GOOGLE_CLIENT_ID,
      });
      const userId = ticket.getUserId();

      if (!userId) return;
      const { userToken, userInfo } = await Data.login(userId);


      redisClient.get(userToken, async (err, reply) => {
        if (err) throw err;

        if (reply !== null) {
          //중복시 처리
          console.log('중복!');
        }

        if (reply === null) {
          const sUserInfo = JSON.stringify(userInfo);
          redisClient.set(userToken, sUserInfo);
          res.setHeader('Set-Cookie', `madimadi=${userToken}; path=/;`);
          res.statusCode = 200;

          return res.end();
        }
      });
    } catch (e) {
      res.statusCode = 500;

      return res.send(e);
    }
  }
};

export default auth;
