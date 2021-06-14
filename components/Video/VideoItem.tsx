import Image from 'next/image';
import styled from 'styled-components';

import { VideoType } from '../../types/video';
import { useModal } from '../Modal/ProvideModal';

import PlayBox from './PlayBox';

interface ContainerType {
  dataId: string;
}

const Container = styled.div<ContainerType>`
  display: inline-block;
  position: relative;
  top: 0px;
  border-radius: 5px;
  margin: 40px 25px;
  padding: 5px;
  background: #f5f5f5;
  width: 480px;
  opacity: 1;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s ease-in;
  &&:hover #video-item-user-${props => props.dataId} {
    opacity: 1;
  }
  &&:hover {
    top: -15px;
  }
  .video-item-container {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    .video-thumbnail {
      width: 100%;
      height: 260px;
      position: relative;
      .user-container {
        position: absolute;
        right: 10px;
        top: 10px;
        background: #00000038;
        color: white;
        display: flex;
        align-items: center;
        height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 15px;
        opacity: 0.5;
        border-radius: 5px;
        .user-avatar {
          display: flex;
          align-items: center;
          img {
            border-radius: 10px;
          }
        }
        .user-name {
          margin-left: 5px;
        }
      }
    }
    .video-item-contents {
      display: flex;
      flex-direction: column;
      height: 70px;
      padding: 20px;
      background: white;
      .video-title {
        color: black;
        font-size: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        width: 400px;
        overflow: hidden;
      }
      .video-author {
        margin-top: 20px;
        color: #999;
        font-size: 13px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        width: 150px;
        overflow: hidden;
      }
      .video-description {
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        width: 150px;
        overflow: hidden;
        margin-top: 7px;
        color: #828282;
        font-size: 10px;
      }
    }
  }
`;

interface IProps {
  data: VideoType;
}

const VideoItem: React.FC<IProps> = ({ data }) => {
  const modal = useModal();

  const onClickOpenModal = (data: VideoType) => {
    modal.openModal(<PlayBox data={data}/>);
  };

  return (
    <Container
      dataId={String(data.id)}
      onClick={() => onClickOpenModal(data)}
    >
      <div className='video-item-container'>
        <div className='video-thumbnail'>
          <Image
            src={data.videoThumbnail}
            alt='thumbnail'
            objectFit='cover'
            layout='fill'
          />
          <div
            id={'video-item-user-' + String(data.id)}
            className='user-container'
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
        </div>
        <div className='video-item-contents'>
          <div className='video-title'>
            {
              data.title
            }
          </div>
          <div className='video-author'>
            {
              data.videoAuthor
            }
          </div>
          <div className='video-description'>
            {
              data.description
            }
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VideoItem;
