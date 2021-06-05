import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { WindowDimensionType } from '../../types/dimension';
import phrases from '../../data/phrases.json';

export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};

  if (cookieString) {
    const itemString = cookieString?.split(/\s*;\s*/);

    itemString.forEach((pairs) => {
      const pair = pairs.split(/\s*=\s*/);
      cookies[pair[0]] = pair.splice(1).join('=');
    });
  }

  return cookies;
};

export const useWindowDimensions = (): WindowDimensionType => {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;

    return {
      width,
      height,
    };
  };
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => setWindowDimensions(getWindowDimensions());
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};

export const generateMadi = (dataNumber: number) => {
  const generatedMaidMadi: any = [];
  phrases.forEach((phrase, i) => {
    if (i + 1 > dataNumber) {
      generatedMaidMadi.push({
        id: i + dataNumber,
        dateCode: format(new Date(), 'yyyyMMdd'),
        dateIndex: i + dataNumber,
        authorId: 0,
        description: phrase.description,
        source: phrase.author,
        createdAt: '',
        updatedAt: '',
        author: {
          id: 0,
          googleId: '0',
          email: '0',
          userName: 'MadiMadi',
          userPicture: 'https://lh3.googleusercontent.com/a-/AOh14Gil5OYBD87Zl-687iYIQR6LrZNygksorn5Ht3qKPQ=s96-c',
          createdAt: '',
        },
        likes: [],
      });
    }
  });

  return generatedMaidMadi;
};
