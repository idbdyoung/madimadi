import Image from 'next/image';
import styled from 'styled-components';

import { useSelector } from '../../store';
import { MadiType } from '../../types/madi';

import Heart from '../../public/static/images/heart.svg';
import CheckedHeart from '../../public/static/images/heartChecked.svg'
import Comment from '../../public/static/images/comment.svg';

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
  cursor: pointer;
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
  const postBoard = useSelector(state => state.postBoard);
  const user = useSelector(state => state.auth).user;

  const onClickOpenPost = () => {};

  return (
    <Container
      height={height}
      onClick={onClickOpenPost}
    >
      <Contents isSwipeMode={postBoard.isSwipeMode}>
        <div className='contents-container'>
          <div className='contents-header'>
            <div className='contents-menu'>
              <div className='menu-icon'>
                <Image
                  className='user-avatar'
                  src={data.author.userPicture}
                  width={20}
                  height={20}
                />
              </div>
              <div className='menu-value'>
                {
                  data.author.userName
                }
              </div>
            </div>
            <div className='contents-menu'>
              <div className='menu-icon'>
                {
                  user && data.likes.find(data => data.userName === user?.userName) ?
                  <CheckedHeart /> :
                  <Heart />
                }
              </div>
              <div className='menu-value'>
                {
                  data.likes.length
                }
              </div>
            </div>
            <div className='contents-menu'>
              <div className='menu-icon'>
                <Comment />
              </div>
              <div className='menu-value'>
                코맨트 개수
              </div>
            </div>
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
