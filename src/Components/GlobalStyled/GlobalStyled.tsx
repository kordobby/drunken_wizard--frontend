import { createGlobalStyle } from "styled-components";
import "../GlobalStyled/GlobalStyled.module.css";

import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset} // normalize
  * {
    margin: 0;
    padding: 0;
}
a{
    text-decoration: none;
}
input:focus {
    outline: none;
    box-shadow: none;
}
body {
    -ms-overflow-style: none;
    }
    ::-webkit-scrollbar {
    display: none;
    
}
:root {
    --orange : #FD6F33;
    --wine : #5D180A;
    --brown : #89504E;
    --beige : #DDC1A5;
    --white : #FFF;
}
`;

export default GlobalStyle;
