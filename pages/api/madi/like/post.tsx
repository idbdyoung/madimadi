
import { NextApiRequest } from 'next';

import verify, { NextApiResponseWithAccessToken } from '../../../../lib/utils/verifyAccessToken';
import prisma from '../../../../lib/db';
import { MadiLikeBodyType } from '../../../../types/madi';

const like = async (req: NextApiRequest, res: NextApiResponseWithAccessToken) => {
  if (req.method === 'POST') {
    try {
      const { userId, madiId }: MadiLikeBodyType = req.body;
      const result = await prisma.madiLikes.create({
        data: {
          madiId,
          userId,
        },
      });
      res.statusCode = 201;

      return res.send(result);
    } catch (e) {
      console.log(e);
      return res.send(e);
    }
  }
};

export default verify(like);
