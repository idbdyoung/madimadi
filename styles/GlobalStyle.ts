import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    scroll-behavior: smooth;
    overscroll-behavior-y: none;
  }
  body {
    width: 100vw;
    box-sizing: border-box;
  }
  a {
    color: #000000;
    text-decoration: none;
    outline: none;
  }
  a:hover, a:active {
    text-decoration: none;
  }
  button,
  button:focus,
  button:active {
    padding: 0;
    border: none;
    background: none;
    outline: none;
  }
  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
