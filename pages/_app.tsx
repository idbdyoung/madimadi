import { AppContext, AppProps } from 'next/app';

import axios from '../lib/api/index';
import { authAPI } from '../lib/api/auth';
import { cookieStringToObject } from '../lib/utils';
import GlobalStyle from '../styles/GlobalStyle';

import ProvideAuth from '../components/ProvideAuth';
import ProvideModal from '../components/ProvideModal';
import Header from '../components/Header';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <ProvideAuth user={pageProps.user}>
      <GlobalStyle />
      <ProvideModal>
        <Header />
        <Component { ...pageProps }/>
      </ProvideModal>
    </ProvideAuth>
  );
};

app.getInitialProps = async ({ ctx }: AppContext) => {
  let pageProps = {};
  let user = null;
  const cookieString = ctx.req?.headers.cookie;
  const cookieObject = cookieStringToObject(cookieString);

  try {
    if (cookieObject['madimadi']) {
      axios.defaults.headers.cookie = cookieObject['madimadi'];
      const { data } = await authAPI();

      if (data) user = data;
    }
    pageProps = { user };
  } catch (e) {
    console.log(e);
  }

  return { pageProps };
};

export default app;
