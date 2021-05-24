import { useEffect, useState } from 'react';

import { WindowDimensionType } from '../types/dimension';
import { MadiType } from '../types/madi';
import {
  PostBoardState,
  ScrollDataState,
  SwipeDataState,
} from '../types/reduxState';

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
    }
  };
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => setWindowDimensions(getWindowDimensions());
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow])

  return windowDimensions;
};

export const isSwipeDataStateType = (arg: any): arg is SwipeDataState => {
  return arg.recycledData !== undefined;
};

export const handleResponseToSwipeData = (
  swipeData: SwipeDataState,
  responseData: MadiType[]
): SwipeDataState => {
  if (!responseData.length) return {
    ...swipeData,
    waitingData: [...swipeData.recycledData],
    recycledData: [],
  };

  return {
    ...swipeData,
    waitingData: swipeData.waitingData.concat(responseData),
  };
};

export const handleResponseToScrollData = (
  scrollData: ScrollDataState,
  responseData: MadiType[]
): ScrollDataState => {
  return scrollData.concat(responseData);
};

export const handleBoardDataWhenChangeMode = (postBoardState: PostBoardState): (
  SwipeDataState | ScrollDataState
) => {
  const {
    isSwipeMode,
    receivedData,
    swipeData,
  } = postBoardState;

  if (isSwipeMode) return receivedData;
  return {
    currentData: [...swipeData.currentData],
    waitingData: [...swipeData.waitingData],
    recycledData: [...swipeData.recycledData],
  };
};

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
