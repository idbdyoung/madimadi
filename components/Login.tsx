import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  .login-box {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 400px;
    background: white;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 15px;
    .login-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #E5E5E5;
      .login-header-title {
        flex: 1;
        font-size: 23px;
        font-weight: bold;
      }
      button {
        width: 30px;
        font-size: 25px;
      }
    }
    .login-body {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      .login-button-google {
        cursor: pointer;
      }
    }
  }
`;

const Login: React.FC = () => {
  return (
    <Container>
      <div className='login-box'>
        <div className='login-header'>
          <div className='login-header-title'>
            Login to MadiMadi
          </div>
          <button onClick={() => {}}>x</button>
        </div>
        <div className='login-body'>
          <Image
            className='login-button-google'
            src='/static/images/google-login-button.png'
            alt='google-login'
            width={191}
            height={46}
            onClick={() => {}}
          />
        </div>
      </div>
    </Container>
  );
};

export default Login;
