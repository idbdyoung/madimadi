import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    width: 100vw;
    box-sizing: border-box;
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
