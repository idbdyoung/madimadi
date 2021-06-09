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
    focusedIndex,
  } = postBoardState;

  if (isSwipeMode) {
    return receivedData;
  }
  const newCurrentData = receivedData.slice(focusedIndex, focusedIndex + 4);
  const newWaitingData = receivedData.slice(focusedIndex + 4);
  const newRecycledData = receivedData.slice(0, focusedIndex);

  return {
    currentData: newCurrentData,
    waitingData: newWaitingData,
    recycledData: newRecycledData,
  };
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
