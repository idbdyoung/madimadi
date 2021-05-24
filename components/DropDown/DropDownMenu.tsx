import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  font-size: 13px;
  :hover {
    opacity: 0.7;
  };
`;

interface IProps {
  title?: string;
  route?: string;
  component?: (...any: any) => any;
}

const DropDownMenu: React.FC<IProps> = ({
  title,
  route,
  component,
}) => {
  return (
    <Container>
      {
        title && route ?
        <Link href={route}>
          <a>
            {title}
          </a>
        </Link> :
        component && component()
      }
    </Container>
  );
};

export default DropDownMenu;
