import { AppProps } from 'next/app';

import GlobalStyle from '../styles/GlobalStyle';

import Header from '../components/Header';
import Login from '../components/Login';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Login />
      <Header />
      <Component { ...pageProps }/>
    </>
  );
};

export default app;
