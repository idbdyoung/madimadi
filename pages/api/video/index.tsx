import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/db';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const nIndex = Number(req.query.index);
      const videos = await prisma.video.findMany({
        skip: nIndex,
        take: 20,
        include: {
          author: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
      });
      res.statusCode = 200;

      return res.send(videos);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;

      return res.end();
    }
  }
};

export default index;
