import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useSelector } from '../../store';
import { LoadingAction } from '../../store/loading';
import { postMadi } from '../../lib/api/madi';

import BlueButton from '../BlueButton';
import TimeBox from '../TimeBox';
import Loading from '../Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-left: 50px;
  width: 300px;
  height: 400px;
  font-family: Noto Sans;
  .writing-box-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70px;
    .writing-box-date{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      flex: 1;
      font-size: 18px;
      font-weight: bold;
    }
    .writing-box-title-container {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 100%;
      flex: 1;
      .writing-box-continue-day {
        position: absolute;
        top: 20px;
        right: 5px;
        font-size: 11px;
        font-weight: 400;
        color: #707683;
      }
      .writing-box-title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex: 1;
        font-size: 15px;
        font-weight: bold;
      }
    }
  }
  .writing-box-formbody {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 330px;
    .writing-box-body-contents {
      position: relative;
      width: 100%;
      flex: 1;
      margin-top: 10px;
      margin-bottom: 5px;
      textarea {
        text-align: center;
        vertical-align: middle;
        padding-top: 100px;
        width: 300px;
        height: 100%;
        border: 1px solid #C2CFE0;
        background: #F2F9FF;
      }
      textarea:focus {
        outline: none;
      }
      textarea::placeholder {
        width: 100%;
        padding: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .writing-box-body-source {
      position: relative;
      width: 100%;
      height: 50px;
      margin-top: 5px;
      margin-bottom: 10px;
      input {
        text-align: center;
        padding: 20px 30px;
        width: 100%;
        height: 100%;
        border: 1px solid #C2CFE0;
        background: #F2F9FF;
        color: #707683;
      }
      input :focus {
        outline: none;
      }
    }
    .writing-box-body-button {
      position: relative;
      width: 100%;
      height: 44px;
    }
  }
`;

const WritingBox: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.loading.postMadimadiState);
  const [madi, setMadi] = useState({
    description: '',
    source: '',
  });

  const onChangeMadi = (e: any) => {
    if (!user) return alert('???????????? ????????? ????????? ?????????.');
    const { name, value } = e.target;
    setMadi((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmitMadi = async () => {
    if (!user) return alert('???????????? ????????? ????????? ?????????.');
    if (!madi.description) return alert('????????? ??? ????????? ????????? ?????????.');

    try {
      dispatch(LoadingAction.startPostMadiMadi());
      const result = await postMadi({
        authorId: user.id,
        ...madi,
      });
      dispatch(LoadingAction.finishPostMadiMadi());

      if (result.status === 201) {
        alert('?????????????????????.');
        setMadi({
          description: '',
          source: '',
        });
      }
    } catch (error) {
      dispatch(LoadingAction.finishPostMadiMadi());
      console.log(error);
    }
  };

  return (
    <Container>
      <div className='writing-box-header'>
        <div className='writing-box-date'>
          <TimeBox />
        </div>
        <div className='writing-box-title-container'>
          <div className='writing-box-continue-day'>
            3??? ?????? ?????????
          </div>
          <div className='writing-box-title'>
            ?????? ??? ??????
          </div>
        </div>
      </div>
      <form className='writing-box-formbody'>
        {
          isLoading ?
          <Loading /> :
          <>
            <div className='writing-box-body-contents'>
              <textarea
                placeholder='
                  ????????? ?????? ??? ????????? ???????????????&#13;&#10;
                  ?????? ????????? ??????&#13;&#10;
                  ??????????????? ?????? ????????? ????????????.
                '
                name='description'
                value={madi.description}
                onChange={onChangeMadi}
              />
            </div>
            <div className='writing-box-body-source'>
              <input
                type='text'
                placeholder='????????? ???????????????'
                name='source'
                value={madi.source}
                autoComplete={'off'}
                onChange={onChangeMadi}
              />
            </div>
            <div className='writing-box-body-button'>
              <BlueButton
                text='??? ?????? ??????'
                onClick={onSubmitMadi}
                borderRadius={5}
              />
            </div>
          </>
        }
      </form>
    </Container>
  );
};

export default WritingBox;
