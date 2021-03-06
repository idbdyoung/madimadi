import { LoadingType } from '../types/loading';

const GET_MADIMADI_START = 'loading/GET_MADIMADI_START' as const;
const GET_MADIMADI_FINISH = 'loading/GET_MADIMADI_FINISH' as const;
const POST_MADIMADI_START = 'loading/POST_MADIMADI_START' as const;
const POST_MADIMADI_FINISH = 'loading/POST_MADIMADI_FINISH' as const;
const SET_MADI_LIKE_START = 'loading/SET_MADI_LIKE_START' as const;
const SET_MADI_LIKE_FINISH = 'loading/SET_MADI_LIKE_FINISH' as const;
const POST_VIDEO_START = 'loading/POST_VIDEO_START' as const;
const POST_VIDEO_FINISH = 'loading/POST_VIDEO_FINISH' as const;
const GET_VIDEO_START = 'loading/GET_VIDEO_START' as const;
const GET_VIDEO_FINISH = 'loading/GET_VIDEO_FINISH' as const;

const startGetMadiMadi = () => ({ type: GET_MADIMADI_START });
const finishGetMadiMadi = () => ({ type: GET_MADIMADI_FINISH });
const startPostMadiMadi = () => ({ type: POST_MADIMADI_START });
const finishPostMadiMadi = () => ({ type: POST_MADIMADI_FINISH });
const startSetMadiLike = () => ({ type: SET_MADI_LIKE_START });
const finishSetMadiLike = () => ({ type: SET_MADI_LIKE_FINISH });
const startPostVideo = () => ({ type: POST_VIDEO_START });
const finishPostVideo = () => ({ type: POST_VIDEO_FINISH });
const startGetVideo = () => ({ type: GET_VIDEO_START });
const finishGetVideo = () => ({ type: GET_VIDEO_FINISH });

const initialState: LoadingType = {
  getMadiMadiState: false,
  postMadimadiState: false,
  setMadiLikeState: false,
  postVideoState: false,
  getVideoState: false,
};

export const LoadingAction = {
  startGetMadiMadi,
  finishGetMadiMadi,
  startPostMadiMadi,
  finishPostMadiMadi,
  startSetMadiLike,
  finishSetMadiLike,
  startPostVideo,
  finishPostVideo,
  startGetVideo,
  finishGetVideo,
};

type LoadingAction =
  | ReturnType<typeof startGetMadiMadi>
  | ReturnType<typeof finishGetMadiMadi>
  | ReturnType<typeof startPostMadiMadi>
  | ReturnType<typeof finishPostMadiMadi>
  | ReturnType<typeof startSetMadiLike>
  | ReturnType<typeof finishSetMadiLike>
  | ReturnType<typeof startPostVideo>
  | ReturnType<typeof finishPostVideo>
  | ReturnType<typeof startGetVideo>
  | ReturnType<typeof finishGetVideo>;


const reducer = (
  state = initialState,
  action: LoadingAction
) => {
  switch (action.type) {
    case GET_MADIMADI_START:
      return {
        ...state,
        getMadiMadiState: true,
      };
    case GET_MADIMADI_FINISH:
      return {
        ...state,
        getMadiMadiState: false,
      };
    case POST_MADIMADI_START:
      return {
        ...state,
        postMadimadiState: true,
      };
    case POST_MADIMADI_FINISH:
      return {
        ...state,
        postMadimadiState: false,
      };
    case SET_MADI_LIKE_START:
      return {
        ...state,
        setMadiLikeState: true,
      };
    case SET_MADI_LIKE_FINISH:
      return {
        ...state,
        setMadiLikeState: false,
      };
    case POST_VIDEO_START:
      return {
        ...state,
        postVideoState: true,
      };
    case POST_VIDEO_FINISH:
      return {
        ...state,
        postVideoState: false,
      };
    default:
      return state;
  }
};

export default reducer;
