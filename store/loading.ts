import { LoadingType } from '../types/loading';

const GET_MADIMADI_START = 'fetch/GET_MADIMADI_START' as const;
const GET_MADIMADI_FINISH = 'fetch/GET_MADIMADI_FINISH' as const;
const POST_MADIMADI_START = 'fetch/POST_MADIMADI_START' as const;
const POST_MADIMADI_FINISH = 'fetch/POST_MADIMADI_FINISH' as const;

const startGetMadiMadi = () => ({ type: GET_MADIMADI_START });
const finishGetMadiMadi = () => ({ type: GET_MADIMADI_FINISH });
const startPostMadiMadi = () => ({ type: POST_MADIMADI_START });
const finishPostMadiMadi = () => ({ type: POST_MADIMADI_FINISH });

const initialState: LoadingType = {
  getMadiMadiFetching: false,
  postMadimadiFetching: false,
};

export const LoadingAction = {
  startGetMadiMadi,
  finishGetMadiMadi,
  startPostMadiMadi,
  finishPostMadiMadi,
};

type LoadingAction =
  | ReturnType<typeof startGetMadiMadi>
  | ReturnType<typeof finishGetMadiMadi>
  | ReturnType<typeof startPostMadiMadi>
  | ReturnType<typeof finishPostMadiMadi>;

const reducer = (
  state = initialState,
  action: LoadingAction
) => {
  switch (action.type) {
    case GET_MADIMADI_START:
      return {
        ...state,
        getMadiMadiFetching: true,
      };
    case GET_MADIMADI_FINISH:
      return {
        ...state,
        getMadiMadiFetching: false,
      };
    case POST_MADIMADI_START:
      return {
        ...state,
        postMadimadiFetching: true,
      };
    case POST_MADIMADI_FINISH:
      return {
        ...state,
        postMadimadiFetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
