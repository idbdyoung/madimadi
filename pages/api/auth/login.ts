import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import redis from '../../../lib/redis';
import prisma from '../../../lib/db';
import googleClient from '../../../lib/auth';
import endpoint from '../../../endpoint';

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
        userData = await prisma.user.create({
          data: {
            googleId: googleId,
            email: (<string>userInfo.email),
            userName: (<string>userInfo.name),
            userPicture: (<string>userInfo.picture),
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
      console.log(e);

      return res.send(e);
    }
  }
};

export default login;
