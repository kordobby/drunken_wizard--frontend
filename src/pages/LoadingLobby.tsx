import { BackWrap, LogLogo } from "../Components/UserComponents/UserStyled";
import styled from "styled-components";
import { keyframes } from "styled-components";
const LoadingLobby = () => {
  return (
    <BackWrap>
      <LogLogo top={5.729} bottom={4.6875}></LogLogo>
      <LoadingSpan>Loading...</LoadingSpan>
    </BackWrap>
  );
};

const nowPlaying = keyframes`
  0% {
    transform: translateY(0);
  } 
  50% {
    transform: translateY(-0.625vw);
  } 100% {
    transform: translateY(0);
  }
`;

const LoadingSpan = styled.span`
  animation: ${nowPlaying} 1s ease infinite;
  font-size: 80px;
  color: white;
  margin-top: 6vw;
`;

export default LoadingLobby;
