import { UserType } from './user';
import { MadiType } from './madi';

export type AuthState = {
  isInvalidToken: boolean;
  isLoggedIn: boolean;
  user: UserType | null;
};
export type DropDownState = {
  isOpen: boolean;
};
export type PostBoardState = {
  fetch: boolean;
  isSwipeMode: boolean;
  loading: boolean;
  error: any;
  nextRequestMadiIndex: number;
  focusedIndex: number;
  receivedData: MadiType[];
  swipeData: SwipeDataState;
  scrollData: ScrollDataState;
  postItemHeight: number;
};
export type SwipeDataState = {
  currentData: MadiType[];
  waitingData: MadiType[];
  recycledData: MadiType[];
};
export type AppHeightState = {
  appHeight: number;
  headerHeight: number;
  pageHeight: number;
};

export type ScrollDataState = MadiType[];
