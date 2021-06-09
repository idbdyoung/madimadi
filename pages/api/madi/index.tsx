import { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';
import { Madi } from '@prisma/client';

import prisma from '../../../lib/db';
import { generateMadi } from '../../../lib/utils';

interface madiResponseType {
  responseData: Madi[],
  nextRequestIndex: number,
}

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const nIndex = Number(req.query.index);
      const dateCode = format(new Date(), 'yyyyMMdd');
      const madimadi = await prisma.madi.findMany({
        skip: nIndex,
        take: 10,
        where: { dateCode },
        include: {
          author: true,
          likes: true,
        },
      });

      if (nIndex < 10) {
        let defaultMadiMadi: any = [];

        if (!nIndex) {
          defaultMadiMadi = generateMadi(madimadi.length);
        }
        const response: madiResponseType = {
          responseData: [...madimadi, ...defaultMadiMadi],
          nextRequestIndex: nIndex + madimadi.length,
        };

        return res.send(response);
      }
      const response: madiResponseType = {
        responseData: madimadi,
        nextRequestIndex: nIndex + madimadi.length,
      };
      res.statusCode = 200;

      return res.send(response);
    } catch (e) {
      res.statusCode = 500;

      return res.send(e);
    }
  }
};

export default index;
