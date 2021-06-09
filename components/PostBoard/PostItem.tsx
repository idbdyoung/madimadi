import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useSelector } from '../../store';
import { MadiType } from '../../types/madi';
import { deleteMadiLike, postMadiLike } from '../../lib/api/madi';

import LikeIcon from '../LikeIcon';
import { PostBoardAction } from '../../store/postBoard';
import { LoadingAction } from '../../store/loading';

interface ContainerType {
  height: number;
}

const Container = styled.div.attrs<ContainerType>((props) => ({
  style: {
    height: `${props.height}px`,
  },
}))<ContainerType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface ContentsType {
  isSwipeMode: boolean;
}

const Contents = styled.div<ContentsType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 95%;
  background: white;
  border: 1px solid #C2CFE0;
  border-radius: 3px;
  ${(props) => !props.isSwipeMode && `
    :hover {
      background: white;
      border: 2px solid #C2CFE0;
    };
  `}
  .contents-container {
    display: flex;
    flex-direction: row;
    width: 96%;
    height: 94%;
    font-family: Noto Sans;
    font-size: 12px;
    .contents-header {
      display: flex;
      flex-direction: column;
      width: 150px;
      .contents-menu {
        display: flex;
        width: 100%;
        height: 30px;
        .menu-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          .user-avatar {
            border-radius: 10px;
          }
        }
        .menu-value {
          display: flex;
          align-items: center;
          flex: 1;
          font-weight: 500;
          color: #6A707E;
        }
      }
    }
    .contents-text {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      flex: 1;
    }
    .contents-source {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      width: 150px;
      color: #6A707E;
      margin-bottom: 10px;
    }
  }
`;

interface IProps {
  data: MadiType;
  height: number;
}

const PostItem: React.FC<IProps> = ({ data, height }) => {
  const dispatch = useDispatch();
  const isSwipeMode = useSelector(state => state.postBoard.isSwipeMode);
  const isLoading = useSelector(state => state.loading.setMadiLikeState);
  const user = useSelector(state => state.auth.user);
  const [currentUserLikeId, setCurrentUserLikeId] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState(0);

  const onClickOpenPostItem = () => {};
  const postLike = async (madiId: number) => {
    if (isSwipeMode) return;
    if (isLoading) return;

    try {
      dispatch(LoadingAction.startSetMadiLike());
      const result = await postMadiLike({
        userId: user?.id,
        madiId,
      });
      setCurrentUserLikeId(result.data.id);
      setLikeCount(likeCount + 1);
      dispatch(PostBoardAction.setLike(data.id, result.data));
      dispatch(LoadingAction.finishSetMadiLike());
    } catch (error) {
      console.log(error);
    }
  };
  const deleteLike = async (likeId: number) => {
    if (isSwipeMode) return;
    if (isLoading) return;

    try {
      dispatch(LoadingAction.startSetMadiLike());
      await deleteMadiLike(likeId);
      setCurrentUserLikeId(null);
      setLikeCount(likeCount - 1);
      dispatch(currentUserLikeId && PostBoardAction.setUnLike(data.id, currentUserLikeId));
      dispatch(LoadingAction.finishSetMadiLike());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let likeId = null;

    if (user) {
      likeId = data.likes.find(like => like.userId === user.id)?.id ?? null;
    }
    setCurrentUserLikeId(likeId);
    setLikeCount(data.likes.length);

    return () => {
      setCurrentUserLikeId(null);
      setLikeCount(0);
    };
  }, [data]);

  return (
    <Container
      height={height}
      onClick={onClickOpenPostItem}
    >
      <Contents isSwipeMode={isSwipeMode}>
        <div className='contents-container'>
          <div className='contents-header'>
            <div className='contents-menu'>
              <Link href={data.author.id ? `/user/${data.author.userName}`: '/'}>
                <a className='menu-icon'>
                  <Image
                    className='user-avatar'
                    src={data.author.userPicture}
                    width={20}
                    height={20}
                  />
                </a>
              </Link>
              <div className='menu-value'>
                {
                  data.author.userName
                }
              </div>
            </div>
            {
            data.author.id !== 0 &&
            <div className='contents-menu'>
              <div className='menu-icon'>
                <LikeIcon
                  currentUserLikeId={currentUserLikeId}
                  onClickColoredHeart={() => currentUserLikeId && deleteLike(currentUserLikeId)}
                  onClickUnCOloredHeart={() => postLike(data.id)}
                />
              </div>
              <div className='menu-value'>
              {
                likeCount
              }
              </div>
            </div>
            }
          </div>
          <div className='contents-text'>
            {
              data.description
            }
          </div>
          <div className='contents-source'>
            {
              data.source
            }
          </div>
        </div>
      </Contents>
    </Container>
  );
};

export default PostItem;
