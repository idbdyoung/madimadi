import { Dispatch } from 'redux';

import { getMadi } from '../lib/api/madi';
import {
  handleResponseToSwipeData,
  handleResponseToScrollData,
  isSwipeDataStateType,
  delay,
} from '../lib/utils/postBoard';
import { MadiType } from '../types/madi';
import {
  PostBoardState,
  ScrollDataState,
  SwipeDataState,
} from '../types/reduxState';

const CHANGE_BOARD_MODE = 'postBoard/CHANGE_BOARD_MODE' as const;
const SET_FETCH = 'postBoard/SET_FETCH' as const;
const SET_FOCUSED_DATA_INDEX = 'postBoard/SET_FOCUSED_DATA_INDEX' as const;
const SET_POST_ITEM_HEIGHT = 'postBoard/SET_POST_ITEM_HEIGHT' as const;
const FETCH_DATA_START = 'postBoard/FETCH_DATA_START' as const;
const FETCH_DATA_ERROR = 'postBoard/FETCH_DATA_ERROR' as const;
const FETCH_DATA_SUCCESS = 'postBoard/FETCH_DATA_SUCCESS' as const;
const SET_SCROLL_DATA = 'postBoard/SET_SCROLL_DATA' as const;
const SET_SWIPE_DATA = 'postBoard/SET_SWIPE_DATA' as const;

const setPostItemHeight = (height: number) => ({ type: SET_POST_ITEM_HEIGHT, height });
const setFetch = () => ({ type: SET_FETCH });
const setFocusedDataIndex = (index: number) => ({ type: SET_FOCUSED_DATA_INDEX, index });
const fetchDataStart = () => ({ type: FETCH_DATA_START });
const fetchDataError = (error: any) => ({ type: FETCH_DATA_ERROR, error });
const fetchDataSuccess = (index: number, data: MadiType[]) => ({ type: FETCH_DATA_SUCCESS, index, data });
const fetchBoardData = (postBoardState: PostBoardState) => async (dispatch: Dispatch) => {
  const {
    swipeData,
    scrollData,
    nextRequestMadiIndex,
    isSwipeMode,
  } = postBoardState;

  try {
    dispatch(fetchDataStart());
    await delay(500);
    const { data } = await getMadi(nextRequestMadiIndex);
    const { responseData, nextRequestIndex } = data;
    dispatch(fetchDataSuccess(nextRequestIndex, responseData));

    if (isSwipeMode) {
      const newSwipeData = handleResponseToSwipeData(swipeData, responseData);

      return dispatch(setData(newSwipeData));
    }
    const newScrollData = handleResponseToScrollData(scrollData, responseData);

    return dispatch(setData(newScrollData));
  } catch (error) {
    console.log(error);
    dispatch(fetchDataError(error));
  }
};
const changeBoardMode = () => {
  return {
    type: CHANGE_BOARD_MODE,
  };
};
const setData = (data: SwipeDataState | ScrollDataState) => {
  if (isSwipeDataStateType(data)) {
    return {
      type: SET_SWIPE_DATA,
      data: {
        currentData: [...data.currentData],
        waitingData: [...data.waitingData],
        recycledData: [...data.recycledData],
      },
    };
  } else {
    return {
      type: SET_SCROLL_DATA,
      data,
    };
  }
};

export const PostBoardAction = {
  changeBoardMode,
  fetchBoardData,
  setData,
  setFetch,
  setFocusedDataIndex,
  setPostItemHeight,
  fetchDataSuccess,
};

type PostBoardAction =
  | ReturnType<typeof changeBoardMode>
  | ReturnType<typeof fetchDataStart>
  | ReturnType<typeof fetchDataError>
  | ReturnType<typeof fetchDataSuccess>
  | ReturnType<typeof setPostItemHeight>
  | ReturnType<typeof setFetch>
  | ReturnType<typeof setData>
  | ReturnType<typeof setFocusedDataIndex>;

const initialState: PostBoardState = {
  fetch: true,
  isSwipeMode: true,
  loading: false,
  error: null,
  nextRequestMadiIndex: 0,
  focusedIndex: 0,
  receivedData: [],
  swipeData: {
    currentData: [],
    waitingData: [],
    recycledData: [],
  },
  scrollData: [],
  postItemHeight: 0,
};
const reducer = (
  state: PostBoardState = initialState,
  action: PostBoardAction
) => {
  switch (action.type) {
    case CHANGE_BOARD_MODE:
      return {
        ...state,
        isSwipeMode: !state.isSwipeMode,
      };
    case SET_POST_ITEM_HEIGHT:
      return {
        ...state,
        postItemHeight: action.height,
      };
    case SET_FETCH:
      return {
        ...state,
        fetch: !state.fetch,
      };
    case SET_FOCUSED_DATA_INDEX:
      return {
        ...state,
        focusedIndex: action.index,
      };
    case FETCH_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        nextRequestMadiIndex: action.index,
        receivedData: [
          ...state.receivedData,
          ...action.data
        ],
        error: null,
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_SWIPE_DATA:
      return {
        ...state,
        swipeData: action.data,
      };
    case SET_SCROLL_DATA:
      return {
        ...state,
        scrollData: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
