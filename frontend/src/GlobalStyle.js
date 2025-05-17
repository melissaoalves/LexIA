import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    background-color: #2d2d2d;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
`;

export default GlobalStyle;
