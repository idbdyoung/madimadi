import { UserType } from '../types/user';
import { AuthState } from '../types/reduxState';

const SET_LOGGED_IN = 'auth/SET_LOGGED_IN' as const;
const SET_LOGGED_OUT = 'auth/SET_LOGGED_OUT' as const;
const SET_INVALID_TOKEN = 'auth/SET_INVALID_TOKEN' as const;

const setLoggedIn = (user: UserType) => {
  return {
    type: SET_LOGGED_IN,
    user,
  };
};
const setLoggedOut = () => {
  return {
    type: SET_LOGGED_OUT,
  };
};
const setInvalidToken = () => {
  return {
    type: SET_INVALID_TOKEN,
  };
};

export const AuthAction = {
  setLoggedIn,
  setLoggedOut,
  setInvalidToken,
};

type AuthAction =
  | ReturnType<typeof setLoggedIn>
  | ReturnType<typeof setLoggedOut>
  | ReturnType<typeof setInvalidToken>;

const initialState: AuthState = {
  isInvalidToken: false,
  isLoggedIn: false,
  user: null,
};

const reducer = (
  state: AuthState = initialState,
  action: AuthAction
) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        isInvalidToken: false,
      };
    case SET_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isInvalidToken: false,
      };
    case SET_INVALID_TOKEN:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isInvalidToken: true,
      };
    default:
      return state;
  }
};

export default reducer;
