import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .logout-button {
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: 13px;
  }
  .logout-button :hover {
    opacity: 0.7;
  }
`;

interface IProps {
  onClick: (...any: any) => any;
}

const Logout: React.FC<IProps> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <div className='logout-button'>
        로그아웃
      </div>
    </Container>
  );
};

export default Logout;
