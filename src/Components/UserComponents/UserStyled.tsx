import styled from "styled-components";
import flex from "../GlobalStyled/flex";
import logoImg from "../../images/logo/logo.png";
import bubble from "../../images/imgs/bubble.png";
import introBg from "../../images/background/introBackground.png";
import { LogoProps, DupCheckProps } from "../../typings/typedb";

export const StWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  z-index: -5;
`;

export const BackWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${introBg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1000;
`;

export const Wrap = styled.div`
  ${flex({ direction: "column" })};
`;

export const LoginBtnBox = styled.div`
  width: 22.8125vw;
  position: relative;
  margin-bottom: 1.5625vw;
  ${flex({ justify: "space-between" })};
`;

export const LogLogo = styled.img.attrs({
  src: `${logoImg}`,
})<LogoProps>`
  margin-top: ${(props) => props.top && `${props.top}vw`};
  margin-bottom: ${(props) => props.bottom && `${props.bottom}vw`};
  /* margin: 5.729vw 0 4.6875vw 0; // 4.6875vw 5.729vw */
  width: 36.51vw;
  /* height: 33.148vw; */
`;

export const SignLogo = styled.img`
  display: flex;
  margin: 5.729vw 0 3.703vw 0;
`;

export const InputBoxId = styled.div`
  margin-bottom: 1.0415vw;
  position: relative;
`;

export const InputBoxPw = styled.div`
  position: relative;
  margin-bottom: 3.645vw;
`;

export const Input = styled.input`
  width: 23.958vw;
  height: 3.125vw;
  box-sizing: border-box;
  padding: 0px 1.041vw;
  border-radius: 0.625vw;
  border-color: transparent;
  outline: 1px solid #fd6f33;
  outline-offset: -1px;
  font-size: 2.22vh;
  position: relative;
  &:focus {
    color: #fd6f33;
    outline: 1px solid #fd6f33;
    outline-offset: -1px;
    box-shadow: 0px 0px 10px 2px #fd6f33;
    text-shadow: 0px 0px 4px #ffffff, 0 0 0em blue, 0 0 0.1em #ffffff;
  }
  &:hover {
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

// signUp
export const IdCheckButton = styled.button<DupCheckProps>`
  box-sizing: border-box;
  width: 4.6875vw;
  height: 3.125vw;
  border: none;
  background-color: ${(props) => (props.dup ? "var(--orange)" : "var(--grey)")};
  color: white;
  font-size: 1.666vh;
  border-radius: 0 0.625vw 0.625vw 0;
  top: 0;
  right: 0;
  z-index: 5;
  position: absolute;
  outline: 1px solid var(--orange);
  outline-offset: -1px;
  &:hover {
    outline: 1px solid var(--orange);
    outline-offset: -1px;
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px var(--orange);
  }
`;

export const IdCheckButton2 = styled.button`
  /* box-sizing: border-box; */
  /* width: 4.6875vw;
  height: 3.125vw;
  border: none;
  background-color: #9e9e9e;
  color: white;
  font-size: 1.666vh;
  border-radius: 0 0.625vw 0.625vw 0;
  top: 0;
  right: 0;
  z-index: 5;
  position: absolute;
  outline: 1px solid #fd6f33;
  outline-offset: -1px;

  &:hover {
    outline: 1px solid #fd6f33;
    outline-offset: -1px;
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  } */
`;

export const Button = styled.button`
  width: 211px;
  height: 83px;
  border: none;
  margin-right: 0.833vw;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;
export const Button1 = styled.button`
  width: 211px;
  height: 83px;
  border: none;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;
export const Button2 = styled.button`
  width: 438px;
  height: 83px;
  border: none;
  margin-top: 28px;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

export const SpeechBubble = styled.div`
  width: 12.291vw;
  height: 6.7708vw;
  background-image: url(${bubble});
  background-size: cover;
  position: absolute;
  top: -0.5208vw;
  right: -13.02vw;
  box-sizing: border-box;
  padding: 1.0416vw 1.5625vw 0 2.8645vw;
  .bubble__notice {
    font-size: 0.9375vw;
    font-family: "국립박물관문화재단클래식B";
  }
`;

export const ButtonBox = styled.div`
  width: 23.958vw;
  ${flex({ justify: "space-between" })};
`;

// 전체화면 전환
export const ResizeBtn = styled.button`
  border: none;
  background-color: transparent;
  position: fixed;
  top: 1.5625vw;
  right: 2.083vw;
  img {
    width: 4.166vw;
    height: 4.166vw;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    /* box-shadow: 0px 0px 10px 2px #fd6f33; */
  }
`;

// 룰북 모달
export const RuleBtn = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  top: 1.3025vw;
  right: 6.77vw;
  color: #fd6f33;
  font-size: 20px;
  img {
    width: 3.645vw;
    height: 4.6875vw;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    /* box-shadow: 0px 0px 10px 2px #fd6f33; */
  }
`;
