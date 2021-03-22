import styled from 'styled-components';

interface IProps {
  text: string;
  onClick: (...any: any) => any;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 80px;
  border-radius: 60px;
  background: #2F80ED;
  color: white;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const Button: React.FC<IProps>= ({ text, onClick }) => {
  return (
    <Container onClick={onClick}>
      {
        text
      }
    </Container>
  );
};

export default Button;
