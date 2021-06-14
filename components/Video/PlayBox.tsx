import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

import { VideoType } from '../../types/video';
import { useModal } from '../Modal/ProvideModal';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 1300px;
  height: 505px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  iframe {
    flex: 1;
    height: 100%;
  }
  .playbox-contents {
    width: 400px;
    height: 100%;
    background: white;
    .playbox-author {
      cursor: pointer;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      height: 30px;
      margin: 20px;
      .user-avatar {
        margin-right: 10px;
        img {
          border-radius: 10px;
        }
      }
    }
    .playbox-title {
      padding: 0 30px 0 30px;
      line-height: 25px;
      color: black;
      font-size: 20px;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .playbox-description {
      font-size: 14px;
      padding: 20px 30px 0 30px;
    }
  }
`;

interface IProps {
  data: VideoType;
}

const PlayBox: React.FC<IProps> = ({ data }) => {
  const router = useRouter();
  const modal = useModal();

  const onClickMoveUserPage = () => {
    modal.closeModal();
    router.push(`/user/${data.author.userName}`);
  };

  return (
    <Container>
      <iframe
        src={data.videoHtmlInsert}
        allowFullScreen={true}
      />
      <div className='playbox-contents'>
        <div
          className='playbox-author'
          onClick={onClickMoveUserPage}
        >
          <div className='user-avatar'>
            <Image
              src={data.author.userPicture}
              width={20}
              height={20}
            />
          </div>
          <div className='user-name'>
            {
              data.author.userName
            }
          </div>
        </div>
        <div className='playbox-title'>
          {
            data.title
          }
        </div>
        <div className='playbox-description'>
          {
            data.description
          }
        </div>
      </div>
    </Container>
  );
};

export default PlayBox;
