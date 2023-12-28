import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

const GlobalColor = styled.createGlobalStyle`
  :root {
    --white: #fff;
    --black: #000;
    --button-background: #90c3ff;
    --header-color: #fff2ad;
  }
`;

export default GlobalColor;
