import { createGlobalStyle } from 'styled-components';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const globalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}

button {
  cursor: pointer;
  font-family: 'MontSerrat', Helvetica, sans-serif !important;
}

html, body, #root {
  height: 100%;
}

body {
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  background: #24202C;
  font-family: 'MontSerrat', Helvetica, sans-serif !important;
  color: #fff;
}
`;


export default globalStyle;
