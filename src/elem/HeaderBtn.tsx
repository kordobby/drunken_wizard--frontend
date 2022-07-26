import styled, { css } from "styled-components";
import { HeaderBtnProps } from "../typings/typedb";
import icon from "../images/icons/OutIcon.png";
import flex from "../Components/GlobalStyled/flex";
const HeaderBtn = ({ text, clickFunc }: HeaderBtnProps) => {
  return (
    <HeaderBtnSt onClick={clickFunc}>
      <span className="logout__text">{text}</span>
      <Icon></Icon>
    </HeaderBtnSt>
  );
};

const Icon = styled.img.attrs({
  src: `${icon}`,
})`
  width: 1.875vw;
  height: 2.34375vw;
`;

const HeaderBtnSt = styled.button`
  width: 12.708vw;
  height: 3.854vw;
  margin-left: 2.1875vw;
  background-color: #564d4d;
  color: var(--white);
  font-size: 1.875vw;
  border-radius: 0.55vh;
  border: none;
  font-family: "국립박물관문화재단클래식B";
  box-shadow: inset 0.208vw 0.208vw 0.208vw rgba(0, 0, 0, 0.25);
  ${flex({ justify: "center", align: "center" })};
  .logout__text {
    background-color: #ffffff;
    color: transparent;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    /* box-shadow: 0px 0px 10px 2px #fd6f33; */
  }
`;

export default HeaderBtn;
