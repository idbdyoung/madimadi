import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    width: 100vw;
    box-sizing: border-box;
    overflow-y: hidden;
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
  textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    resize: none;
  }
  input {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
