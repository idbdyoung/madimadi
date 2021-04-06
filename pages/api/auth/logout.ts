import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import Redis from '../../../lib/redis';
import endpoint from '../../../endpoint';
import { cookieStringToObject } from '../../../lib/utils';


const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const access_token = req.headers.cookie;
      const cookieObject = cookieStringToObject(access_token);

      if (!cookieObject['madimadi']) {
        res.statusCode = 400;

        return res.end();
      }
      const { data } = (<any>jwt.verify(cookieObject['madimadi'], endpoint.JWT_SECRET));

      if (!data) {
        res.statusCode = 400;

        return res.end();;
      }
      Redis.get(cookieObject['madimadi'], async (err) => {
        if (err) throw err;
        Redis.del(cookieObject['madimadi']);
      });
      res.setHeader('Set-Cookie','madimadi=deleted; path=/;');
      res.statusCode = 200;

      return res.end();
    } catch (e) {
      res.statusCode = 500;
      console.log(e);

      return res.end();
    }
  }
};

export default logout;
