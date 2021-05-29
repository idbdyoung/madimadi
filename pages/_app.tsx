import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import App, { AppContext, AppProps } from 'next/app';
import styled from 'styled-components';

import GlobalStyle from '../styles/GlobalStyle';
import axios from '../lib/api/index';
import { authAPI } from '../lib/api/auth';
import { cookieStringToObject, useWindowDimensions } from '../lib/utils';
import { useSelector, wrapper } from '../store';
import { AuthAction } from '../store/auth';
import { AppHeightAction } from '../store/appHeight';

import ProvideModal from '../components/Modal/ProvideModal';
import Header from '../components/Header/Header';

interface AppContainerType {
  appHeight: number;
}

const AppContainer = styled.div.attrs<AppContainerType>((props) => ({
  style: {
    height: `${props.appHeight}px`,
  },
}))<AppContainerType>`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface PageContainerType {
  pageHeight: number;
}

const PageContainer = styled.div.attrs<PageContainerType>((props) => ({
  style: {
    height: `${props.pageHeight}px`,
  },
}))<PageContainerType>`
  width: 100%;
  flex: 1;
`;

const app = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();
  const { appHeight, pageHeight } = useSelector(state => state.appHeight);
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    if (windowHeight !== null) {
      dispatch(AppHeightAction.setAppHeight(windowHeight));
    }
  }, [windowHeight]);

  return (
    <AppContainer appHeight={appHeight}>
      <GlobalStyle />
      <ProvideModal>
        <Header />
        <PageContainer pageHeight={pageHeight}>
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
    if (!isLoggedIn && cookieObject['madimadi'] && cookieObject['madimadi'] !== 'deleted') {
      axios.defaults.headers.cookie = cookieObject['madimadi'];
      const { data } = await authAPI();
      store.dispatch(AuthAction.setLoggedIn(data));
    }
  } catch (e) {
    console.log(e);
  } finally {
    return { ...appInitialProps };
  }
};

export default wrapper.withRedux(app);
