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
    font-family: "국립박물관문화재단클래식M";
    -ms-overflow-style: none;
    }
    ::-webkit-scrollbar {
    display: none;
    
}
button {
    :hover {
        cersor: pointer;
    }
}
:root {
    --purple-1 : #3f0984;
    --purple-2 : #c59aef;
    --purple-3 : #e4c7f9;
    --purple-4 : #ede4f2;
    --yellow : #ffc900;
    --orange : #FD6F33;
    --brown-1 : #5d180a;
    --brown-2 : #b68961;
    --brown-3 : #d6b27f;
    --grey : #9e9e9e;
    --white : #fff;
}
`;

export default GlobalStyle;
