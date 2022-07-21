import styled, { Keyframes } from "styled-components";
import {
  LogLogo,
  BackWrap,
  LeftBeerImg,
  RightBeerImg,
  BeerBgImg,
  Shadow,
} from "./UserStyled";

const Splash = () => {
  return (
    <BackWrap>
      <LogLogo top={5.729} bottom={4.6875}></LogLogo>
      <BeerBgImg></BeerBgImg>
      <RightBeerImg></RightBeerImg>
      <LeftBeerImg></LeftBeerImg>
      <Shadow></Shadow>
    </BackWrap>
  );
};

export default Splash;
