import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  ${reset}
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
  ul,
  ol,
  li {
    list-style: none;
  }
`;

export default GlobalStyle;
