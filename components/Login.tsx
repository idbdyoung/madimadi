import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';

import endpoint from '../endpoint';

const Container = styled.div`
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

interface IProps {
  onSuccess: (...any: any) => any;
  onFailure: (...any: any) => any;
  onCloseModal: (...any: any) => any;
}

const Login: React.FC<IProps> = ({
  onSuccess,
  onFailure,
  onCloseModal
}) => {
  return (
    <Container>
      <div className='login-box'>
        <div className='login-header'>
          <div className='login-header-title'>
            Login to MadiMadi
          </div>
          <button onClick={onCloseModal}>x</button>
        </div>
        <div className='login-body'>
          <GoogleLogin
            clientId={endpoint.GOOGLE_CLIENT_ID}
            buttonText="Google Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </Container>
  );
};

export default Login;
