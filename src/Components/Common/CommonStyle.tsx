import styled from "styled-components";
import flex from "../GlobalStyled/flex";
import { BtnProps } from "../../typings/typedb";
import kakaoBtn from "../../images/buttons/BTN_kakao.png";
import activeMBtn from "../../images/buttons/BTN_activeM.png";
import inactiveMBtn from "../../images/buttons/BTN_inactiveM.png";
export const StWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  z-index: -5;
`;

export default function matchBtnImg(data: string) {
  switch (data) {
    case "kakao":
      return kakaoBtn;
    case "activeM":
      return activeMBtn;
    case "inactiveM":
      return inactiveMBtn;
    default:
      return activeMBtn;
  }
}

export const DefaultBtn = styled.button<BtnProps>`
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
  background-image: url(${(props) => matchBtnImg(props.btnType)});
  background-size: cover;
  background-position: center;
  width: ${({ size }) => size && `${size}vw`};
  height: 4.3229vw;
  border: none;
`;

export const BtnText = styled.span`
  font-size: 1.25vw;
  font-family: "국립박물관문화재단클래식B";
  background-color: #f1f1f1;
  color: transparent;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
`;
