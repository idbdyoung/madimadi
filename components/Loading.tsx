import styled from 'styled-components';
import { ImSpinner } from 'react-icons/im';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .spinner-icon {
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <Container>
      <ImSpinner className='spinner-icon'/>
    </Container>
  );
};

export default Loading;
