import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

const GlobalFont = styled.createGlobalStyle`
  @font-face {
    font-family: "폰트 이름";
    src: url("다운받은폰트경로") format("woff");
  }
`;

export default GlobalFont;
