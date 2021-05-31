import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import endpoint from '../../endpoint';
import { cookieStringToObject } from './index';

export const verifyAccessToken = (accessToken: string | undefined) => {
  if (!accessToken || accessToken === endpoint.TOKEN_DELETED) {
    return false;
  }

  try {
    jwt.verify(accessToken, endpoint.JWT_SECRET);
    return accessToken;
  } catch (error) {
    return false;
  }
};

export type NextApiResponseWithAccessToken = NextApiResponse & {
  accessToken: string;
};

const verify = (handler: any) => (req: NextApiRequest, res: NextApiResponseWithAccessToken) => {
  try {
    const cookieObject = cookieStringToObject(req.headers.cookie);
    const accessToken = verifyAccessToken(cookieObject['madimadi']);

    if (!accessToken) {
      res.statusCode = 401;
      return res.end();
    }
    res.accessToken = accessToken;

    return handler(req, res);
  } catch {
    res.statusCode = 500;
    return res.end();
  }
};

export default verify;
