import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector } from '../../store';

import { UserWroteType, VideoResultType } from './AddVideo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background: #f5f5f5;
  border-radius: 5px;
  .video-preview-item-container {
    display: flex;
    flex-direction: column;
    border: 0.5px solid white;
    border-radius: 5px;
    .video-thumbnail {
      position: relative;
      width: 480px;
      height: 270px;
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
        width: 400px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        overflow: hidden;
      }
      .video-author {
        margin-top: 20px;
        color: #999;
        font-size: 13px;
        width: 300px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
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
  videoResult: VideoResultType | null;
  userWrote: UserWroteType | null;
}

const Preview: React.FC<IProps> = ({ videoResult, userWrote }) => {
  const user = useSelector(state => state.auth.user);
  const [data, setData] = useState({
    ...videoResult,
    ...userWrote,
  });

  useEffect(() => {
    setData({
      ...videoResult,
      ...userWrote,
    });

    return () => setData({});
  }, [videoResult, userWrote]);

  return (
    <Container>
      <div className='video-preview-item-container'>
        <div className='video-thumbnail'>
          {
            data.videoThumbnail &&
            <Image
              src={data.videoThumbnail}
              alt='thumbnail'
              objectFit='cover'
              layout='fill'
            />
          }
          {
            user &&
            <div className='user-container'>
              <div className='user-avatar'>
                <Image
                  src={user.userPicture}
                  width={20}
                  height={20}
                />
              </div>
              <div className='user-name'>
                {
                  user.userName
                }
              </div>
            </div>
          }
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

export default Preview;
