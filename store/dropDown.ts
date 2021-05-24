import { DropDownState } from '../types/reduxState';

const CLICK_DROPDOWN_MENU = 'dropDown/CLICK_DROPDOWN_MENU' as const;
const CLOSE_DROPDOWN = 'dropDown/CLOSE_DROPDOWN' as const;

const clickDropDownMenu = () => {
  return {
    type: CLICK_DROPDOWN_MENU,
  };
};
const closeDropDown = () => {
  return {
    type: CLOSE_DROPDOWN,
  };
};

export const DropDownAction = {
  clickDropDownMenu,
  closeDropDown,
};

type DropDownAction =
  | ReturnType<typeof clickDropDownMenu>
  | ReturnType<typeof closeDropDown>;

const initialState: DropDownState = {
  isOpen: false,
};

const reducer = (
  state: DropDownState = initialState,
  action: DropDownAction
) => {
  switch (action.type) {
    case CLICK_DROPDOWN_MENU:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case CLOSE_DROPDOWN:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default reducer;
