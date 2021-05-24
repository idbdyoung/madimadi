import styled from 'styled-components';
import { ImSpinner } from 'react-icons/im';

import { useSelector } from '../store';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
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
  const isLoading = useSelector(state => state.postBoard).loading;

  return (
    <Container>
      {
        isLoading && <ImSpinner className='spinner-icon'/>
      }
    </Container>
  );
};

export default Loading;
