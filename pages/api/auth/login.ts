import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import redis from '../../../lib/redis';

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
      let userData: any = await prisma.user.findFirst({ where: { googleId } });

      if (userData === null) {
        userData = prisma.user.create({
          data: {
            googleId: googleId,
            userName: (<string>userInfo.name),
            userPhoto: (<string>userInfo.picture),
          },
        });
      }
      const accesToken = jwt.sign({ data: googleId }, endpoint.JWT_SECRET);
      const jUserData = JSON.stringify(userData);
      redis.set(accesToken, jUserData);
      res.setHeader('Set-Cookie', `madimadi=${accesToken}; path=/;`);
      res.statusCode = 200;

      return res.send(userData);
    } catch (e) {
      res.statusCode = 500;
      return res.send(e);
    }
  }
};

export default login;
