import { useEffect, useState } from 'react';

interface dimensionType {
  width: number | null;
  height: number | null;
}

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

export const useWindowDimensions = (): dimensionType => {
  const hasWindow = typeof window !== 'undefined';
  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;

    return {
      width,
      height,
    }
  };
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => setWindowDimensions(getWindowDimensions());
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow])

  return windowDimensions;
};
