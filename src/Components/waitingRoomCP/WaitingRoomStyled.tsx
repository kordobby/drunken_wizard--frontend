import styled from "styled-components";
import flex from "../GlobalStyled/flex";
// images
import waitingBack from "../../images/background/lobbybackground.webp";
import header from "../../images/imgs/header.webp";
import vs2 from "../../images/waiting/vs2.webp";
import swit from "../../images/waiting/swit.webp";
import xUser from "../../images/waiting/XUser.webp";
import xUser2 from "../../images/waiting/XUser2.webp";
import oUser from "../../images/waiting/OUser.webp";
import oUser2 from "../../images/waiting/OUser2.webp";

import { TeamProps } from "../../typings/typedb";

export const Header = styled.header`
  width: 100vw;
  min-width: 70vw;
  height: 12.96vh;
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${header});
  ${flex({ align: "center", justify: "left" })}
`;

export const WaitingWrap = styled.div`
  width: 100vw;
  height: 87vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${waitingBack});
  ${flex({ align: "center", justify: "center", direction: "column" })}
  z-index: -5;
`;

export const TeamWrap = styled.div`
  width: 74.47vw;
  height: 35.41vh;
  margin-bottom: 1.85vh;
  ${flex({ align: "center", justify: "space-between" })}
`;

export const TeamBox = styled.div<TeamProps>`
  width: 23.95vw;
  height: 35.41vw;
  border-radius: 0.625vw;
  border: 2px solid ${(props) => (props.team ? "#3f0984" : "#5d180a")};
  background-color: ${(props) => (props.team ? "#ede4f2" : "#d6b27f")};
  box-sizing: border-box;
  ${flex({ align: "center", direction: "column" })}
`;

export const TeamHeader = styled.div<TeamProps>`
  width: 23.95vw;
  height: 5.2vw;
  box-sizing: border-box;
  border-radius: 0.525vw 0.525vw 0 0;
  background-color: ${(props) => (props.team ? "#3f0984" : "#5d180a")};
  span {
    font-size: 1.875vw;
    color: white;
  }
  ${flex({ align: "center", justify: "center" })}
`;

export const User1 = styled.div`
  width: 14.58vw;
  height: 26.8vh;
  padding: 0.7vw 7.81vw 0 0;
  ${flex({ align: "center", direction: "column", justify: "center" })}
`;

export const User2 = styled.div`
  width: 14.58vw;
  height: 26.8vh;
  padding: 0.7vw 0 0 7.81vw;
  ${flex({ align: "center", direction: "column", justify: "center" })}
`;

export const UserImg = styled.div<TeamProps>`
  width: 10.41vw;
  height: 10.41vw;
  outline: 0.15vw solid ${(props) => (props.team ? "#3f0984" : "#5d180a")};
  outline-offset: -0.15vw;
  border-radius: 5.2vw;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => (props.team ? oUser : oUser2)});
`;
export const XUserImg = styled.div<TeamProps>`
  width: 10.41vw;
  height: 10.41vw;
  outline: 0.15vw solid ${(props) => (props.team ? "#3f0984" : "#5d180a")};
  outline-offset: -0.15vw;
  border-radius: 5.2vw;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => (props.team ? xUser : xUser2)});
`;

export const UserName: any = styled.span<TeamProps>`
  width: 11.45vw;
  height: 2.6vw;
  border-radius: 5.2vw;
  font-size: 1.25vw;
  margin: -1vw;
  outline: 0.15vw solid ${(props) => (props.team ? "#3f0984" : "#5d180a")};
  outline-offset: -0.15vw;
  background-color: white;
  color: ${(props) => (props.team ? "#3f0984" : "#5d180a")};
  ${flex({ align: "center", justify: "center" })}
`;

export const ReadyName: any = styled.span<TeamProps>`
  width: 11.45vw;
  height: 2.6vw;
  border-radius: 5.2vw;
  font-size: 1.25vw;
  margin: -1vw;
  outline: 0.05vw solid ${(props) => (props.team ? "#3f0984" : "#5d180a")};
  outline-offset: -0.05vw;
  background-color: ${(props) => (props.team ? "#3f0984" : "#5d180a")};
  color: white;
  ${flex({ align: "center", justify: "center" })}
`;

export const VSImg = styled.img.attrs({
  src: `${vs2}`,
})`
  width: 6.77vw;
  height: 9.89vw;
`;
export const SwitImg = styled.img.attrs({
  src: `${swit}`,
})`
  width: 4.94vw;
  height: 5.98vw;
`;

export const VsBox = styled.div`
  width: 22.58vw;
  height: 35.41vw;
  span {
    font-size: 1.875vw;
    margin: 0.4vw;
    color: white;
  }
  ${flex({ align: "center", justify: "center", direction: "column" })}
`;
