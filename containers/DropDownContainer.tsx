import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useSelector } from '../store';
import { DropDownAction } from '../store/dropDown';

import DropDownIcon from '../public/static/images/dropDownButton.svg';
import DropDown from '../components/DropDown/DropDown';

const Container = styled.div`
  margin-top: 5px;
  z-index: 999;
  .drop-down-icon :hover {
    cursor: pointer;
    opacity: 0.3;
  }
`;
const DropDownDim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 995;
`;

const DropDownContainer: React.FC = () => {
  const dispatch = useDispatch();
  const dropDown = useSelector(state => state.dropDown);

  const onClickDropDownIcon = () => {
    dispatch(DropDownAction.clickDropDownMenu());
  };
  const onClickCloseDropDown = () => {
    dispatch(DropDownAction.closeDropDown());
  };

  return (
    <>
      <Container>
        <DropDownIcon
          className='drop-down-icon'
          onClick={onClickDropDownIcon}
        />
        {
          dropDown.isOpen &&
          <DropDown />
        }
      </Container>
      {
        dropDown.isOpen &&
        <DropDownDim onClick={onClickCloseDropDown}/>
      }
    </>
  );
};

export default DropDownContainer;
