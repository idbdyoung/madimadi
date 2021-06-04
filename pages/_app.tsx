import App, { AppContext, AppProps } from 'next/app';
import styled from 'styled-components';

import GlobalStyle from '../styles/GlobalStyle';
import { authAPI } from '../lib/api/auth';
import { cookieStringToObject } from '../lib/utils';
import { wrapper } from '../store';
import { AuthAction } from '../store/auth';
import endpoint from '../endpoint';

import ProvideModal from '../components/Modal/ProvideModal';
import Header from '../components/Header/Header';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const PageContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContainer>
      <GlobalStyle />
      <ProvideModal>
        <Header />
        <PageContainer>
          <Component { ...pageProps }/>
        </PageContainer>
      </ProvideModal>
    </AppContainer>
  );
};

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { store } = context.ctx;
  const { isLoggedIn } = store.getState().auth;

  try {
    if (!isLoggedIn && cookieObject['madimadi'] && cookieObject['madimadi'] !== endpoint.TOKEN_DELETED) {
      const { data } = await authAPI({ tokenId: cookieObject['madimadi'] });
      store.dispatch(AuthAction.setLoggedIn(data));
    }
  } catch (e) {
    if (e.response.status === 401) {
      store.dispatch(AuthAction.setInvalidToken());
    }
    console.log(e);
  } finally {
    return { ...appInitialProps };
  }
};

export default wrapper.withRedux(app);
