import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import endpoint from '../../../endpoint';

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const access_token = req.headers.cookie;

      if (!access_token) {
        res.statusCode = 400;

        return res.end();
      }
      const { data } = (<any>jwt.verify(access_token, endpoint.JWT_SECRET));

      if (data) return res.send(data);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;

      return res.end();
    }
  }
};

export default auth;
