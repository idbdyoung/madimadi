import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { ImArrowRight } from 'react-icons/im';
import styled from 'styled-components';

import { postVideo } from '../../lib/api/video';
import { useSelector } from '../../store';

import WritingBox from './WritingBox';
import Preview from './Preview';
import BlueButton from '../BlueButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .contents-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 70%;
    height: 80%;
    .arrow-icon-contianer {
      display: flex;
      justify-content: center;
      margin-top: 300px;
      flex: 1;
    }
    .video-preview-container {
      display: flex;
      flex-direction: column;
      margin-top: 50px;
      .video-upload-button {
        margin-top: 10px;
        width: 100%;
        height: 50px;
      }
    }
  }
`;

export interface UserWroteType {
  title: string;
  description: string;
}

export interface VideoResultType {
  videoUrl: string;
  videoTitle: string;
  videoThumbnail: string;
  videoAuthor: string;
  videoHtmlInsert: string;
}

const AddVideo: React.FC = () => {
  const router = useRouter();
  const user = useSelector(state => state.auth.user);
  const [videoResult, setVideoResult] = useState<VideoResultType | null>(null);
  const [userWrote, setUserWrote] = useState({
    title: '',
    description: '',
  });

  const onClickUploadVideo = async () => {
    if (!user) return alert('로그인이 필요한 서비스입니다.');
    if (!videoResult) return;

    try {
      await postVideo({
        authorId: user?.id,
        ...userWrote,
        ...videoResult,
      });
      alert('업로드 되었습니다.');

      return router.push('/share/watch');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className='contents-container'>
        <WritingBox
          userWrote={userWrote}
          videoResult={videoResult}
          setVideoResult={setVideoResult}
          setUserWrote={setUserWrote}
        />
        {
          videoResult &&
          <>
            <div className='arrow-icon-contianer'>
              <ImArrowRight
                size={30}
                color={'#C2CFE0'}
              />
            </div>
            <div className='video-preview-container'>
              <Preview
                videoResult={videoResult}
                userWrote={userWrote}
              />
              <div className='video-upload-button'>
                <BlueButton
                  text='업로드'
                  onClick={onClickUploadVideo}
                  borderRadius={5}
                />
              </div>
            </div>
          </>
        }
      </div>
    </Container>
  );
};

export default AddVideo;
