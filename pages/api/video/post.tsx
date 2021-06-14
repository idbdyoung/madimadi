import { NextApiRequest } from 'next';

import prisma from '../../../lib/db';
import verify, { NextApiResponseWithAccessToken } from '../../../lib/utils/verifyAccessToken';

const post = async (req: NextApiRequest, res: NextApiResponseWithAccessToken) => {
  if (req.method === 'POST') {
    try {
      await prisma.video.create({
        data: req.body,
      });

      return res.end();
    } catch (e) {
      console.log(e);
    }
  }
};

export default verify(post);
