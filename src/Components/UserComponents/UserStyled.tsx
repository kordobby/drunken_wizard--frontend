import styled from "styled-components";
import flex from "../GlobalStyled/flex";
import logoImg from "../../images/logo/logo.png";
import bubble from "../../images/imgs/bubble.png";
import introBg from "../../images/background/introBackground.png";
import { LogoProps, DupCheckProps } from "../../typings/typedb";

export const BackWrap = styled.div`
  ${flex({ direction: "column", align: "center" })};
  width: 100vw;
  height: 100vh;
  background-image: url(${introBg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -5;
`;

export const LogLogo = styled.img.attrs({
  src: `${logoImg}`,
})<LogoProps>`
  width: 36.51vw;
  margin-top: ${(props) => props.top && `${props.top}vh`};
  margin-bottom: ${(props) => props.bottom && `${props.bottom}vh`};
`;

export const InputBoxId = styled.div`
  position: relative;
  margin-bottom: 1.0415vw;
`;

export const InputBoxPw = styled.div`
  position: relative;
  margin-bottom: 6.48vh;
`;

export const Input = styled.input`
  position: relative;
  width: 23.958vw;
  height: 5.55vh;
  padding: 0px 1.041vw;
  box-sizing: border-box;
  border-radius: 0.625vw;
  border-color: transparent;
  outline: 1px solid var(--orange);
  outline-offset: -1px;
  font-family: "국립박물관문화재단클래식M";
  font-size: 2.22vh;
  &::placeholder {
    font-size: 1.25vw;
    color: var(--grey);
  }
  &:focus {
    color: var(--orange);
    box-shadow: 0px 0px 10px 2px var(--orange);
    text-shadow: 0px 0px 4px #ffffff, 0 0 0em blue, 0 0 0.1em #ffffff;
  }
  &:hover {
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px var(--orange);
  }
`;

export const Check = styled.span`
  top: 0.8vw;
  right: 1vw;
  font-size: 0.93vw;
  position: absolute;
`;

// signUp
export const IdCheckButton = styled.button<DupCheckProps>`
  position: absolute;
  width: 4.6875vw;
  height: 5.55vh;
  box-sizing: border-box;
  top: 0;
  right: 0;
  border-radius: 0 0.625vw 0.625vw 0;
  outline: 1px solid var(--orange);
  outline-offset: -1px;
  background-color: ${(props) => (props.dup ? "var(--orange)" : "var(--grey)")};
  color: white;
  font-size: 1.666vh;
  z-index: 5;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px var(--orange);
  }
`;

export const LoginBtnBox = styled.div`
  position: relative;
  width: 22.8125vw;
  margin-bottom: 1.5625vw;
  ${flex({ justify: "space-between" })};
`;

export const SpeechBubble = styled.div`
  position: absolute;
  width: 12.291vw;
  height: 6.7708vw;
  padding: 1.0416vw 1.5625vw 0 2.8645vw;
  background-image: url(${bubble});
  background-size: cover;
  top: -0.5208vw;
  right: -13.02vw;
  box-sizing: border-box;
  .bubble__notice {
    font-size: 0.9375vw;
    font-family: "국립박물관문화재단클래식B";
  }
`;

export const ButtonBox = styled.div`
  ${flex({ justify: "space-between" })};
  width: 23.958vw;
`;

// 전체화면 전환
export const ResizeBtn = styled.button`
  position: fixed;
  top: 1.5625vw;
  right: 2.083vw;
  background-color: transparent;
  img {
    width: 4.166vw;
    height: 4.166vw;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
  }
`;

// 룰북 모달
export const RuleBtn = styled.button`
  background-color: transparent;
  position: absolute;
  top: 1.3025vw;
  right: 6.77vw;
  color: var(--orange);
  font-size: 20px;
  img {
    width: 3.645vw;
    height: 4.6875vw;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(120%);
  }
`;
