import {
  PostBoardState,
  ScrollDataState,
  SwipeDataState,
} from '../../types/reduxState';
import { MadiType } from '../../types/madi';

export const isSwipeDataStateType = (arg: any): arg is SwipeDataState => {
  return arg.recycledData !== undefined;
};

export const handleResponseToSwipeData = (
  swipeData: SwipeDataState,
  responseData: MadiType[]
): SwipeDataState => {
  if (!responseData.length) {
    return {
      ...swipeData,
      waitingData: [...swipeData.recycledData],
      recycledData: [],
    };
  }

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

  if (isSwipeMode) {
    return receivedData;
  }

  return {
    currentData: [...swipeData.currentData],
    waitingData: [...swipeData.waitingData],
    recycledData: [...swipeData.recycledData],
  };
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
