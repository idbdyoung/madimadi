import { NextApiRequest } from 'next';
import { format } from 'date-fns';
import { PrismaClient } from '@prisma/client';

import Data from '../../lib/data';
import verify, { NextApiResponseWithAccessToken } from '../../lib/utils/verifyAccessToken';
import { MadiBodyType } from '../../types/madi';

const prisma = new PrismaClient();

const madi = async (req: NextApiRequest, res: NextApiResponseWithAccessToken) => {
  if (req.method === 'GET') {
    const nIndex = Number(req.query.index);

    try {
      const madimadi = await Data.madi.getMadi(nIndex);
      res.statusCode = 200;

      return res.send(madimadi);
    } catch (e) {
      res.statusCode = 500;

      return res.send(e);
    }
  }

  if (req.method === 'POST') {
    try {
      const { authorId, description, source }: MadiBodyType = req.body;
      const dateCode = format(new Date(), 'yyyyMMdd');
      const createdMadiMadi = await prisma.madi.findMany({ where: { dateCode }});
      await prisma.madi.create({
        data: {
          dateCode,
          dateIndex: createdMadiMadi.length,
          authorId,
          description,
          source,
        },
      });
      res.statusCode = 201;

      return res.end();
    } catch (e) {
      res.statusCode = 500;
      return res.send(e);
    }
  }
};

export default verify(madi);
