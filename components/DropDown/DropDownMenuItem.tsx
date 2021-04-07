import Link from 'next/link';
import styled from 'styled-components';

interface IProps {
  title?: string;
  route?: string;
  ReactFC?: any;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  font-size: 13px;
  :hover {
    opacity: 0.7;
  }
`;

const DropDownMenuItem: React.FC<IProps> = ({ title, route, ReactFC }) => {
  return (
    <Container>
      {
        title && route ?
          <Link href={route}><a>{title}</a></Link> :
          ReactFC && ReactFC()
      }
    </Container>
  );
};

export default DropDownMenuItem;
