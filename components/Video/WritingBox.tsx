import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { ImArrowUp, ImCancelCircle } from 'react-icons/im';
import styled from 'styled-components';

import axios from '../../lib/api';
import { useSelector } from '../../store';
import { LoadingAction } from '../../store/loading';

import Loading from '../Loading';
import { UserWroteType, VideoResultType } from './AddVideo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 100%;
  font-family: Noto Sans;
  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }
  .writing-box-formbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    .form-item {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    input {
      text-align: center;
      padding: 20px 30px;
      width: 100%;
      height: 100%;
      background: #F2F9FF;
      font-size: 15px;
      color: black;
      border: 1px solid #C2CFE0;
    }
    input::placeholder{
      color: #707683;
    }
    input :focus {
      outline: none;
    }
    .input-video-url {
      width: 100%;
      height: 50px;
    }
    .user-wrote-container {
      display: flex;
      flex-direction: column;
      .post-title {
        position: relative;
        width: 100%;
        height: 50px;
        .title-button {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          right: 10px;
          cursor: pointer;
        }
      }
      .post-description {
        width: 100%;
        height: 300px;
        textarea {
          text-align: center;
          vertical-align: middle;
          padding: 20px;
          width: 100%;
          height: 100%;
          border: 1px solid #C2CFE0;
          background: #F2F9FF;
        }
        textarea:focus {
          outline: none;
        }
        textarea::placeholder {
          font-size: 15px;
          text-align: center;
          width: 100%;
          padding: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .video-result {
      width: 100%;
      flex: 1;
      background: white;
      .result-error {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
      .result-success {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        .result-item {
          padding-top: 5px;
          padding-bottom: 5px;
          font-size: 15px;
          color: #707683;
        }
        .result-title {
          width: 100%;
        }
        .result-thumbnail {
          margin-top: 20px;
          position: relative;
          width: 100%;
          flex: 1;
        }
        .result-author {
          width: 100%;
        }
      }
    }
  }
`;

interface IProps {
  userWrote: UserWroteType;
  videoResult: VideoResultType | null;
  setUserWrote: (...any: any) => any;
  setVideoResult: Dispatch<SetStateAction<VideoResultType | null>>;
}

const WritingBox: React.FC<IProps> = ({
  userWrote,
  videoResult,
  setUserWrote,
  setVideoResult,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.postVideoState);
  const isFirstRun = useRef(true);
  const [videoUrl, setVideoUrl] = useState('');

  const onChangeVideoUrl = (e: any) => {
    const { value } = e.target;
    setVideoUrl(value);
  };
  const onChangeUserWrote = (e: any) => {
    const { name, value } = e.target;
    setUserWrote((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onClickSetTitle = () => {
    setUserWrote((prevState: any) => ({
      ...prevState,
      ['title']: videoResult?.videoTitle,
    }));
  };
  const onClickDeleteTitle = () => {
    setUserWrote((prevState: any) => ({
      ...prevState,
      ['title']: '',
    }));
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    (async function() {
      dispatch(LoadingAction.startPostVideo());

      try {
        const { data } = await axios.get(`https://www.youtube.com/oembed?url=${videoUrl}&format=json`);
        const {
          title,
          thumbnail_url,
          author_name,
          html,
        } = data;
        const splitted = html.split(' ');
        const videoHtmlSrc = splitted.find((el: any) => el.includes('src')).split('\"');
        setVideoResult({
          videoUrl,
          videoTitle: title,
          videoThumbnail: thumbnail_url,
          videoAuthor: author_name,
          videoHtmlInsert: videoHtmlSrc[1],
        });
        dispatch(LoadingAction.finishPostVideo());
      } catch (error) {
        dispatch(LoadingAction.finishPostVideo());
        setVideoResult(null);
      }
    })();
  }, [videoUrl]);

  return (
    <Container>
      <div className='title-container'>
        영상 공유하기
      </div>
      <form className='writing-box-formbody'>
        <div className='input-video-url form-item'>
          <input
            type='text'
            name='videoUrl'
            value={videoUrl}
            autoComplete={'off'}
            onChange={onChangeVideoUrl}
            placeholder='공유를 원하는 영상의 url을 입력해 주세요'
          />
        </div>
        {
          videoResult &&
          <div className='user-wrote-container'>
            <div className='post-title form-item'>
              <input
                type='text'
                name='title'
                value={userWrote.title}
                placeholder='제목'
                autoComplete={'off'}
                onChange={onChangeUserWrote}
              />
              <div className='title-button'>
                {
                userWrote.title === '' ?
                <ImArrowUp
                  onClick={onClickSetTitle}
                  color={'#707683'}
                /> :
                <ImCancelCircle
                  onClick={onClickDeleteTitle}
                  color={'#707683'}
                />
                }
              </div>
            </div>
            <div className='post-description form-item'>
              <textarea
                name='description'
                value={userWrote.description}
                onChange={onChangeUserWrote}
                placeholder='글'
              >
              </textarea>
            </div>
          </div>
        }
        <div className='video-result form-item'>
        {
          isLoading ?
          <Loading /> :
          videoResult ?
          <div className='result-success'>
            <div className='result-title result-item'>
              {
                videoResult.videoTitle
              }
            </div>
            <div className='result-author result-item'>
              {
                videoResult.videoAuthor
              }
            </div>
            <div className='result-thumbnail result-item'>
              <Image
                src={videoResult.videoThumbnail}
                alt='thumbnail'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div> :
          <div className='result-error result-item'>
            검색된 결과가 없습니다.
          </div>
        }
        </div>
      </form>
    </Container>
  );
};

export default WritingBox;
