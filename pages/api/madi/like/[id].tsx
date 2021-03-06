import { NextApiRequest } from 'next';

import verify, { NextApiResponseWithAccessToken } from '../../../../lib/utils/verifyAccessToken';
import prisma from '../../../../lib/db';

const unlike = async (req: NextApiRequest, res: NextApiResponseWithAccessToken) => {
  if (req.method === 'DELETE') {
    const id = Number(req.query.id);
    await prisma.madiLikes.delete({
      where: {
        id,
      },
    });
    res.statusCode = 201;

    return res.end();
  }
};

export default verify(unlike);
