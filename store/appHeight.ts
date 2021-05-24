import { AppHeightState } from '../types/reduxState';

const SET_APP_HEIGHT = 'height/SET_APP_HEIGHT' as const;
const SET_HEADER_HEIGHT = 'dimension/SET_HEADER_HEIGHT' as const;

const setAppHeight = (height: number) => ({ type: SET_APP_HEIGHT, height });
const setHeaderHeight = (height: number) => ({ type: SET_HEADER_HEIGHT, height });

export const AppHeightAction = {
  setAppHeight,
  setHeaderHeight,
};

type AppHeightAction =
  | ReturnType<typeof setAppHeight>
  | ReturnType<typeof setHeaderHeight>;

const initialState: AppHeightState = {
  appHeight: 0,
  headerHeight: 0,
  pageHeight: 0,
};

const reducer = (
  state: AppHeightState = initialState,
  action: AppHeightAction
) => {
  switch (action.type) {
    case SET_APP_HEIGHT:
      return {
        ...state,
        appHeight: action.height,
      };
    case SET_HEADER_HEIGHT:
      return {
        ...state,
        headerHeight: action.height,
        pageHeight: state.appHeight - action.height,
      }
    default:
      return state;
  }
};

export default reducer;
