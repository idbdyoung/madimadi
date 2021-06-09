import { Dispatch } from 'redux';

import { getMadi } from '../lib/api/madi';
import {
  handleResponseToSwipeData,
  handleResponseToScrollData,
  isSwipeDataStateType,
  delay,
} from '../lib/utils/postBoard';
import { LoadingAction } from './loading';
import { MadiLikeType, MadiType } from '../types/madi';
import {
  PostBoardState,
  ScrollDataState,
  SwipeDataState,
} from '../types/reduxState';

const CHANGE_BOARD_MODE = 'postBoard/CHANGE_BOARD_MODE' as const;
const SET_FETCH = 'postBoard/SET_FETCH' as const;
const SET_FOCUSED_DATA_INDEX = 'postBoard/SET_FOCUSED_DATA_INDEX' as const;
const SET_POST_ITEM_HEIGHT = 'postBoard/SET_POST_ITEM_HEIGHT' as const;
const FETCH_DATA_ERROR = 'postBoard/FETCH_DATA_ERROR' as const;
const FETCH_DATA_SUCCESS = 'postBoard/FETCH_DATA_SUCCESS' as const;
const SET_SCROLL_DATA = 'postBoard/SET_SCROLL_DATA' as const;
const SET_SWIPE_DATA = 'postBoard/SET_SWIPE_DATA' as const;
const SET_LIKE = 'postBoard/SET_LIKE' as const;
const SET_UNLIKE = 'postBoard/SET_UNLIKE' as const;

const setPostItemHeight = (height: number) => ({ type: SET_POST_ITEM_HEIGHT, height });
const setFetch = () => ({ type: SET_FETCH });
const setFocusedDataIndex = (index: number) => ({ type: SET_FOCUSED_DATA_INDEX, index });
const fetchDataSuccess = (index: number, data: MadiType[]) => ({ type: FETCH_DATA_SUCCESS, index, data });
const fetchDataError = (error: any) => ({ type: FETCH_DATA_ERROR, error });
const changeBoardMode = () => ({ type: CHANGE_BOARD_MODE });
const fetchBoardData = (postBoardState: PostBoardState) => async (dispatch: Dispatch) => {
  const {
    swipeData,
    scrollData,
    nextRequestMadiIndex,
    isSwipeMode,
  } = postBoardState;

  try {
    dispatch(LoadingAction.startGetMadiMadi());
    await delay(500);
    const { data } = await getMadi(nextRequestMadiIndex);
    const { nextRequestIndex, responseData } = data;
    dispatch(fetchDataSuccess(nextRequestIndex, responseData));
    dispatch(LoadingAction.finishGetMadiMadi());

    if (isSwipeMode) {
      const newSwipeData = handleResponseToSwipeData(swipeData, responseData);

      return dispatch(setData(newSwipeData));
    }
    const newScrollData = handleResponseToScrollData(scrollData, responseData);

    return dispatch(setData(newScrollData));
  } catch (error) {
    console.log(error);
    dispatch(fetchDataError(error));
    dispatch(LoadingAction.finishGetMadiMadi());
  }
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
const setLike = (madiId: number, likeObj: MadiLikeType) => {
  return {
    type: SET_LIKE,
    madiId,
    likeObj,
  };
};
const setUnLike = (mdaiId: number, likeId: number) => {
  return {
    type: SET_UNLIKE,
    mdaiId,
    likeId,
  };
};

export const PostBoardAction = {
  changeBoardMode,
  fetchBoardData,
  setData,
  setFetch,
  setFocusedDataIndex,
  setPostItemHeight,
  fetchDataSuccess,
  setLike,
  setUnLike,
};

type PostBoardAction =
  | ReturnType<typeof changeBoardMode>
  | ReturnType<typeof fetchDataError>
  | ReturnType<typeof fetchDataSuccess>
  | ReturnType<typeof setPostItemHeight>
  | ReturnType<typeof setFetch>
  | ReturnType<typeof setData>
  | ReturnType<typeof setFocusedDataIndex>
  | ReturnType<typeof setLike>
  | ReturnType<typeof setUnLike>;

const initialState: PostBoardState = {
  fetch: true,
  isSwipeMode: true,
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
    case SET_LIKE:
      return {
        ...state,
        receivedData: state.receivedData.map(data => {
          if (data.id === action.madiId) {
            data.likes.push(action.likeObj);
          }

          return data;
        }),
      };
    case SET_UNLIKE:
      return {
        ...state,
        receivedData: state.receivedData.map(data => {
          if (data.id === action.mdaiId) {
            data.likes = data.likes.filter(like => {
              if (like.id !== action.likeId) {
                return like;
              }
            });
          }

          return data;
        }),
      };
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
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
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
