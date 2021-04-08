import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../lib/data';

const madi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const madiArr = await Data.madi.getMadi();
      res.statusCode = 200;

      return res.send(madiArr);
    } catch (e) {
      res.statusCode = 500;

      return res.send(e);
    }
  }
};

export default madi;
