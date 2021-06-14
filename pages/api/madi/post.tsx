import { NextApiRequest } from 'next';
import { format } from 'date-fns';

import verify, { NextApiResponseWithAccessToken } from '../../../lib/utils/verifyAccessToken';
import { MadiPostBodyType } from '../../../types/madi';
import prisma from '../../../lib/db';

const post = async (req: NextApiRequest, res: NextApiResponseWithAccessToken) => {
  if (req.method === 'POST') {
    try {
      const { authorId, description, source }: MadiPostBodyType = req.body;
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

export default verify(post);
