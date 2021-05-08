import {
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Heart from '../../public/static/images/heart.svg';
import CheckedHeart from '../../public/static/images/heartChecked.svg'
import Comment from '../../public/static/images/comment.svg';
import { authContext } from '../ProvideAuth';

import { madiType } from '../../types/madi';

interface IProps {
  setTarget?: SetStateAction<any>;
  madi: madiType;
  itemHeight?: number;
}
interface containerType {
  itemHeight?: number;
}

const Container = styled.div.attrs<containerType>((props) => {
  const styleObj: any = { style: {} };

  if (props.itemHeight) {
    styleObj.style.height = `${props.itemHeight - 20}px`;
  } else {
    styleObj.style.flex = 1;
    styleObj.style.border = '1px solid #C2CFE0';
  }

  return styleObj;
})<containerType>`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  width: 99%;
  cursor: pointer;
  background: white;
  border: 1px solid white;
  :hover {
    border: 1px solid #C2CFE0;
  }
  .postbox-inner {
    display: flex;
    padding: 16px;
    flex: 1;
  }
  .postbox-menu-item {
    margin-bottom: 5px;
  }
  .postbox-menu-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }
  .postbox-menu {
    flex: 1;
    .postbox-menu-user {
      display: flex;
      align-items: center;
      .user-avatar {
        border-radius: 100px;
      }
      .user-name {
        font-family: Noto Sans;
        margin-left: 5px;
      }
    }
    .postbox-menu-like {
      display: flex;
      align-items: center;
      .count-like {
        font-family: Noto Sans;
        margin-left: 5px;
      }
    }
    .postbox-menu-comment {
      display: flex;
      align-items: center;
      .count-comment {
        font-family: Noto Sans;
        margin-left: 5px;
      }
    }
  }
  .postbox-menu > div {
    height: 20px;
  }
  .postbox-contents {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 100%;
  }
  .postbox-source {
    flex: 1;
    font-family: Noto Sans;
    display: flex;
    font-size: 12px;
    align-items: flex-end;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const useAuth = () => useContext(authContext);

const PostItem: React.FC<IProps> = ({ setTarget, madi, itemHeight }) => {
  const auth = useAuth();
  const ref = useRef(null);

  useEffect(() => {
    if (ref && setTarget) {
      setTarget(ref.current);
    }

    return () => setTarget && setTarget(null);
  }, [ref]);

  return (
    <Container
      ref={ref}
      itemHeight={itemHeight}
    >
      <div className='postbox-inner'>
        <div className='postbox-menu'>
          <div className='postbox-menu-user postbox-menu-item'>
            <div className='postbox-menu-icon'>
              <Image
                className='user-avatar'
                src={madi.authorObj.userAvatarUrl}
                width={20}
                height={20}
              />
            </div>
            <div className='user-name'>
              { madi.authorObj.userName }
            </div>
          </div>
          <div className='postbox-menu-like postbox-menu-item'>
            <div className='postbox-menu-icon'>
              {
                auth.user ?
                  <Heart
                    width={20}
                    heigth={20}
                  /> :
                  <CheckedHeart />
              }
            </div>
            <div className='count-like'>
              {
                madi.like
              }
            </div>
          </div>
          <div className='postbox-menu-comment postbox-menu-item'>
            <div className='postbox-menu-icon'>
              <Comment />
            </div>
            <div className='count-comment'>
              {
                madi.commentIndex.length
              }
            </div>
          </div>
        </div>
        <div className='postbox-contents'>
          {
            madi.contents
          }
        </div>
        <div className='postbox-source'>
          {
            `- ${madi.source}`
          }
        </div>
      </div>
    </Container>
  );
};

export default PostItem;
