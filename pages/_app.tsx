import { AppProps } from 'next/app';
import Header from '../component/Header';
import GlobalStyle from '../styles/GlobalStyle';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component { ...pageProps }/>
    </>
  );
};

export default app;
