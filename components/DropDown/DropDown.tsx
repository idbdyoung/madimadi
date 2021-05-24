import styled from 'styled-components';

import dropDownMenu from '../../data/dropDownMenu.json';

import DropDownMenu from './DropDownMenu';
import LogoutContainer from '../../containers/LogoutContainer';

const Container = styled.div`
  position: absolute;
  top: 40px;
  width: 100px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 2px;
`;

const DropDown: React.FC = () => {
  return (
    <Container>
      {
        dropDownMenu.map(el => {
          return (
            <DropDownMenu
              key={el.route}
              title={el.title}
              route={el.route}
            />
          );
        })
      }
      <DropDownMenu component={LogoutContainer}/>
    </Container>
  );
};

export default DropDown;