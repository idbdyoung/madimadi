import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import ReduxThunk from 'redux-thunk';

import auth from './auth';
import dropDown from './dropDown';
import postBoard from './postBoard';
import appHeight from './appHeight';

const rootReducer = combineReducers({
  auth,
  dropDown,
  postBoard,
  appHeight,
});
const reducer = (
  state: any,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return rootReducer(state, action);
};
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');

    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};
const initStore = () => createStore(reducer, bindMiddleware([ReduxThunk]));

type RootState = ReturnType<typeof rootReducer>;

export const wrapper = createWrapper(initStore);
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
