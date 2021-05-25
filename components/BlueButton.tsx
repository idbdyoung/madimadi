import styled from 'styled-components';

interface ContainerType {
  borderRadius?: number;
}

const Container = styled.div.attrs<ContainerType>((props) => ({
  style: {
    borderRadius: `${props.borderRadius}px`,
  },
}))<ContainerType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #2F80ED;
  color: white;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

interface IProps {
  text: string;
  borderRadius: number;
  onClick: (...any: any) => any;
}

const BlueButton: React.FC<IProps> = ({
  text,
  borderRadius,
  onClick,
}) => {
  return (
    <Container
      onClick={onClick}
      borderRadius={borderRadius}
    >
      {
        text
      }
    </Container>
  );
};

export default BlueButton;
