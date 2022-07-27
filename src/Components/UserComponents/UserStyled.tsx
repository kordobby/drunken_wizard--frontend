import styled, { keyframes } from "styled-components";
import flex from "../GlobalStyled/flex";
import logoImg from "../../images/logo/logo.png";
import bubble from "../../images/imgs/bubble.png";
import introBg from "../../images/background/introBackground.png";
import LeftBeer from "../../images/splash/leftBeer.png";
import RightBeer from "../../images/splash/rightBeer.png";
import beerBg from "../../images/splash/beer_bg.png";
import shadow from "../../images/splash/shadow.png";
import { LogoProps, DupCheckProps } from "../../typings/typedb";

export const BackWrap = styled.div`
  ${flex({ direction: "column", justify: "center", align: "center" })};
  width: 100vw;
  height: 100vh;
  background-image: url(${introBg});
  background-position: center;
  background-size: cover;
  background-repeat: repeat;
  z-index: -5;
  overflow: scroll;
  position: fixed;
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
  margin-bottom: 3.645vmin;
`;

export const Input = styled.input`
  position: relative;
  width: 23.958vmax;
  height: 3.125vmax;
  padding: 0px 1.041vmax;
  box-sizing: border-box;
  border-radius: 0.625vmax;
  border-color: transparent;
  outline: 1px solid var(--orange);
  outline-offset: -1px;
  font-family: "국립박물관문화재단클래식M";
  font-size: 1.25vmax;
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
  font-size: 1.3vw;
  position: absolute;
`;

// signUp
export const IdCheckButton = styled.button<DupCheckProps>`
  position: absolute;
  width: 4.6875vmax;
  height: 3.125vmax;
  box-sizing: border-box;
  top: 0;
  right: 0;
  font-size: 0.9375vw;
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
  width: 22.916vw;
  height: 5.208vw;
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
  margin-bottom: 2.77vw;
`;

// 전체화면 전환
export const ResizeBtn = styled.button`
  position: fixed;
  top: 1.7625vw;
  right: 2.083vw;
  background-color: transparent;
  img {
    width: 3.64vw;
    height: 3.64vw;
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

const leftBeerCheers = keyframes`
0% {
  left: -4.427vw;
  transform: rotate(0);
  opacity : 1;
} 20% {
  left: -4.427vw;
    transform: rotate(-4.46deg);
    opacity : 1;
}
  100%{
    left: -4.427vw;
    transform: rotate(-4.46deg);
    opacity : 0;
  }
`;

const leftBeerUp = keyframes`
0% {
  transform: rotateX(0);
  transform: translate(0);
  opacity: 0;
} 100% {
  opacity : 1;
  transform: translate(48.573vw,0);
}
`;

export const LeftBeerImg = styled.img.attrs({
  src: `${LeftBeer}`,
})`
  animation-name: ${leftBeerUp}, ${leftBeerCheers};
  animation-delay: 0s, 0.3s;
  animation-duration: 0.3s, 2s;
  animation-timing-function: ease-in, ease-in;
  width: 52.656vw;
  position: absolute;
  bottom: -1.5625vw;
  left: -53vw;
  z-index: 3;
  /* left: -4.427vw; */
`;

const RightBeerCheers = keyframes`
0% {
  right: -3.6458vw;
  transform: rotate(0);
  opacity : 1;
} 20%{
    right: -3.6458vw;
    transform: rotate(5.92deg);
    opacity : 1;
  }
  100%{
    right: -3.6458vw;
    transform: rotate(5.92deg);
    opacity : 0;
  }
`;

const RightBeerUp = keyframes`
0% {
  transform: translate(0);
  opacity: 0;
} 
  100%{
    /* left: -4.427vw; */
    transform: translate(-50.3542vw,3.6458vw);
    opacity : 1;
  }
`;

export const RightBeerImg = styled.img.attrs({
  src: `${RightBeer}`,
})`
  animation-name: ${RightBeerUp}, ${RightBeerCheers};
  animation-delay: 0s, 0.3s;
  animation-duration: 0.3s, 2s;
  animation-timing-function: ease-in, ease-in;
  position: absolute;
  bottom: -1.0416vw;
  width: 53.609vw;
  right: -54vw;
  z-index: 3;
`;

const logoFlash = keyframes`
  0% {
    opacity: 0;
  } 100%{
    opacity: 1;
  }
`;

const enterGame = keyframes`
0% {
  opacity: 0;
} 25% {
  opacity: 0.5;
} 50% {
  opacity: 1;
} 75% {
  opacity: 0.5;
} 100% {
  opacity: 0;
}
`;

export const DarkBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: fixed;
  z-index: 100;
`;

const beerFlows = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  } 70% {
    opacity: 1;
    transform: translateY(110.916vw);
  }100%{
    opacity: 0;
    transform: translateY(110.916vw);
  }
`;

export const BeerBgImg = styled.img.attrs({
  src: `${beerBg}`,
})`
  position: absolute;
  top: -118.125vw;
  width: 110.434vw;
  animation: ${beerFlows} 3s 1s ease;
  z-index: 0;
`;

const shadowFlash = keyframes`
  0% {
    opacity: 0;
  } 20%{
    opacity: 1;
  } 100%{
    opacity: 0;
  }
`;

export const Shadow = styled.img.attrs({
  src: `${shadow}`,
})`
  position: absolute;
  bottom: -5vw;
  right: -3.8vw;
  width: 74.419vw;
  opacity: 0;
  animation: ${shadowFlash} 1.5s 0.5s ease;
`;

// export const LogLogo = styled.img.attrs({
//   src: `${logoImg}`,
// })<LogoProps>`
//   width: 36.51vmax;
//   margin-top: ${(props) => props.top && `${props.top}vmax`};
//   margin-bottom: ${(props) => props.bottom && `${props.bottom}vmax`};
//   z-index: 5;
// `;
