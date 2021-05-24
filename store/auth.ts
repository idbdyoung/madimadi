import { UserType } from '../types/user';
import { AuthState } from '../types/reduxState';

const SET_LOGGED_IN = 'auth/SET_LOGGED_IN' as const;
const SET_LOGGED_OUT = 'auth/SET_LOGGED_OUT' as const;

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

export const AuthAction = {
  setLoggedIn,
  setLoggedOut,
};

type AuthAction =
  | ReturnType<typeof setLoggedIn>
  | ReturnType<typeof setLoggedOut>;

const initialState: AuthState = {
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
      };
    case SET_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
