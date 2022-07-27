import styled from "styled-components";
import loading from "../images/splash/loadingFront.png";
import background from "../images/background/IngameBackground.png";
import beerBg from "../images/splash/beer_bg.png";
import { keyframes } from "styled-components";

const Loading = () => {
  return (
    <>
      <LoadingWrap></LoadingWrap>
      <BeerWrap></BeerWrap>
      <BeerWrapDup></BeerWrapDup>
      <LoadingBackWrap></LoadingBackWrap>
    </>
  );
};

const LoadingWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;
  background-size: cover;
  background-image: url(${loading});
`;

const LoadingBackWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -8;
  background-size: cover;
  background-image: url(${background});
`;

const loadings = keyframes`
  0% {
    transform: translateY(0x) scaleX(1) scaleY(-0.8);
  } 
  50%{
    transform: translateY(-16vw) scaleX(1.2) scaleY(-2.0);
  } 100%{
    transform: translateY(0) scaleX(1) scaleY(-0.8);
  }
`;

const loadingsDup = keyframes`
  0% {
    transform: translateY(0) scaleX(1) scaleY(-0.4);
  } 
  50%{
    transform: translateY(-15vw) scaleX(1.2) scaleY(-2.8);
  } 100%{
    transform: translateY(0) scaleX(1) scaleY(-0.4);
  }
`;

const BeerWrap = styled.div`
  animation: ${loadings} 5s ease infinite;
  width: 30vw;
  height: 50vh;
  position: fixed;
  z-index: -5;
  background-size: cover;
  background-image: url(${beerBg});
  position: absolute;
  bottom: -10vw;
  filter: blur(5px);
  transform: scaleY(-1);
  left: 35vw;
`;

const BeerWrapDup = styled.div`
  animation: ${loadingsDup} 5s ease infinite;
  width: 30vw;
  height: 50vh;
  position: fixed;
  z-index: -7;
  background-size: cover;
  background-image: url(${beerBg});
  position: absolute;
  bottom: 0;
  transform: scaleY(-1);
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px) brightness(130%) saturate(35%);
  left: 35vw;
`;

//FFF1D7
export default Loading;
