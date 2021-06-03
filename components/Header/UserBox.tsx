import Image from 'next/image'
import styled from 'styled-components';

import DropDownContainer from '../../containers/DropDownContainer';
import { useRouter } from 'next/dist/client/router';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  .user-page {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    :hover {
      opacity: 0.7;
    }
    .user-page-picture {
      margin-right: 10px;
      img {
        border-radius: 100px;
      }
    }
  }
`;

interface Iprops {
  userPicture: string;
  userName: string;
}

const User: React.FC<Iprops> = ({ userPicture, userName }) => {
  const router = useRouter();

  const onClickMoveUserPage = () => {
    router.push({
      pathname: `/user/${userName}`
    });
  };

  return (
    <Container onClick={onClickMoveUserPage}>
      <div className='user-page'>
        <div className='user-page-picture'>
          <Image
            src={userPicture}
            alt='user-page'
            width={30}
            height={30}
          />
        </div>
        {
          userName
        }
      </div>
      <DropDownContainer />
    </Container>
  );
};

export default User;
