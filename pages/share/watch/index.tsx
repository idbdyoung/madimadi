import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router'
import styled from 'styled-components';

import { useSelector } from '../../../store';
import { getVideos } from '../../../lib/api/video';
import { VideoType } from '../../../types/video';

import VideoContainer from '../../../containers/VideoContainer';
import BlueButton from '../../../components/BlueButton';
import Loading from '../../../components/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  .title-container {
    position: sticky;
    width: 100%;
    height: 60px;
    .button-wrapper {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 80px;
      height: 32px;
    }
  }
  .contents-container {
    width: 100%;
    flex: 1;
  }
  .loading-container {
    width: 100%;
    height: 50px;
  }
`;

interface IProps {
  videoList: VideoType[];
}

const index: NextPage<IProps> = ({ videoList }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isLoading = useSelector(state => state.loading.getVideoState);
  const router = useRouter();

  const onClickAddVideo = () => {
    if (!isLoggedIn) return alert('로그인이 필요한 서비스입니다.');
    router.push(`${router.route}/add`);
  };

  return (
    <Container>
      <div className='title-container'>
        <div className='button-wrapper'>
          <BlueButton
            text='글쓰기'
            onClick={onClickAddVideo}
            borderRadius={5}
          />
        </div>
      </div>
      <div className='contents-container'>
        <VideoContainer videoList={videoList}/>
      </div>
      {
        isLoading &&
        <div className='loading-container'>
          <Loading />
        </div>
      }
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await getVideos(0);

    return { props: { videoList: data } };
  } catch (error) {
    console.log(error);

    return { props: {} };
  }
};

export default index;
