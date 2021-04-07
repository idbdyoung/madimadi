import { useState } from 'react';
import styled from 'styled-components';

import { menu as menuList } from '../../data/dropDownMenu.json';
import DropDownIcon from '../../public/static/images/dropDownButton.svg';

import Item from './DropDownMenuItem';
import Logout from '../Logout';

const Container = styled.div`
  margin-top: 5px;
  cursor: pointer;
  .drop-down-icon :hover {
    opacity: 0.3;
  }
`;
const DropDownListContainer = styled.div`
  position: absolute;
  top: 40px;
  width: 100px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 2px;
`;

const DropDownMenu: React.FC = () => {
  const [isClicked, setClicked] = useState(false);

  const onClick = () => (setClicked(!isClicked));

  return (
    <Container onClick={onClick}>
      <DropDownIcon className='drop-down-icon'/>
      {
        isClicked &&
          <DropDownListContainer>
            {
              menuList.map(el => {
                return (
                  <Item
                    key={el.route}
                    title={el.title}
                    route={el.route}
                  />
                );
              })
            }
            <Item ReactFC={Logout}/>
          </DropDownListContainer>
      }
    </Container>
  );
};

export default DropDownMenu;
