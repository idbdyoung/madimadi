import { PrismaClient } from '@prisma/client';

const prisma = (function () {
  let instance: any = null;

  const init = () => (instance = new PrismaClient());

  return {
    getInstance: () => {
      if (!instance) {
        init();
      }

      return instance;
    },
  };
})();


export default prisma;
