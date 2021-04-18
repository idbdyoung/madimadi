import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../lib/data';

const madi = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

export default madi;
