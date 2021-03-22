import { AppProps } from 'next/app';

import GlobalStyle from '../styles/GlobalStyle';
import ProvideAuth from '../components/ProvideAuth';
import ProvideModal, { modalContext } from '../components/ProvideModal';

import Header from '../components/Header';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <ProvideAuth>
      <GlobalStyle />
      <ProvideModal>
        <Header />
        <Component { ...pageProps }/>
      </ProvideModal>
    </ProvideAuth>
  );
};

export default app;
