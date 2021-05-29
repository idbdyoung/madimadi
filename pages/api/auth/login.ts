import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import Data from '../../../lib/data';
import Redis from '../../../lib/redis';
import endpoint from '../../../endpoint';

const googleClient = new OAuth2Client(endpoint.GOOGLE_CLIENT_ID);
const prisma = new PrismaClient();

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { tokenId } = req.body;
      const ticket = await googleClient.verifyIdToken({
        idToken: tokenId,
        audience: endpoint.GOOGLE_CLIENT_ID,
      });
      const googleId = ticket.getUserId();
      const userInfo = ticket.getPayload();

      if (!googleId || !userInfo) {
        throw new Error();
      }
      let userData = await prisma.user.findFirst({
        where: {
          googleId,
        },
      });

      if (!userData) {
        userData = await prisma.user.create({
          data: {
            googleId: googleId,
            userName: (<string>userInfo.name),
            userPhoto: (<string>userInfo.picture),
          },
        });
      }
      const access_token = jwt.sign({ data: googleId }, endpoint.JWT_SECRET );
      res.setHeader('Set-Cookie', `madimadi=${access_token}; path=/;`);
      res.statusCode = 200;

      return res.send(userData);
    } catch (e) {
      res.statusCode = 500;

      return res.send(e);
    }
  }
};

export default login;
