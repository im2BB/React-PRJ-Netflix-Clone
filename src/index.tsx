import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { theme } from "./Utils/theme";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  overflow-x:hidden;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 400;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  color:${(props) => props.theme.white.darker};
  line-height: 1.5;
  background-color: ${(props) => props.theme.black.veryDark};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  text-decoration:none;
  color:inherit;
  transition: color 0.2s ease;
}

a:hover {
  color: ${(props) => props.theme.green.main};
}

/* 반응형 스타일 추가 */
html {
  font-size: 16px;
  
  @media (max-width: 1024px) {
    font-size: 15px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
}

/* 터치 디바이스 최적화 */
@media (hover: none) and (pointer: coarse) {
  button, a, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}

/* 스크롤바 스타일링 - 스포티파이 스타일 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: ${(props) => props.theme.black.darker};
}

::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.black.lighter};
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.green.main};
}

/* 모바일에서 텍스트 선택 방지 */
@media (max-width: 768px) {
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  input, textarea {
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
}

/* 이미지 최적화 */
img {
  max-width: 100%;
  height: auto;
}

/* 컨테이너 최대 너비 설정 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
}

/* 스포티파이 스타일 버튼 */
button {
  background: ${(props) => props.theme.green.main};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${(props) => props.theme.green.light};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

/* 스포티파이 스타일 카드 */
.card {
  background: ${(props) => props.theme.black.darker};
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${(props) => props.theme.black.mediumdark};
    transform: translateY(-2px);
  }
}
`;

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,

  document.getElementById("root")
);
