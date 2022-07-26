import styled from "styled-components";
import flex from "../GlobalStyled/flex";
// images
import waitingBack from "../../images/background/lobbyBackground.png";
import header from "../../images/imgs/header.png";
import vs2 from "../../images/waiting/vs2.png";
import swit from "../../images/waiting/swit.png";
import roomoutBtn from "../../images/buttons/BTN_roomout.png";

export const Header = styled.header`
  width: 100vw;
  min-width: 70vw;
  height: 12.96vh;
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${header});
  ${flex({ align: "center", justify: "space-between" })}
`;

export const RoomoutBtn = styled.button`
  border: none;
  background-color: transparent;
  margin-left: 2.6vw;
  background-image: url(${roomoutBtn});
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    box-shadow: 0px 0px 0.52vw 2px #fd6f33;
  }
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
  height: 62.96vh;
  margin-bottom: 1.85vh;

  ${flex({ align: "center", justify: "space-between" })}
`;

export const MyTeamBox = styled.div`
  width: 23.95vw;
  height: 35.41vw;
  border-radius: 0.625vw;
  border: 2px solid #3f0984;
  background-color: #ede4f2;
  box-sizing: border-box;
  ${flex({ align: "center", direction: "column" })}
`;
export const EnemyTeamBox = styled.div`
  width: 23.95vw;
  height: 35.41vw;
  border-radius: 0.625vw;
  border: 2px solid #5d180a;
  background-color: #d6b27f;
  box-sizing: border-box;
  ${flex({ align: "center", direction: "column" })}
`;

export const MyTeamHeader = styled.div`
  width: 23.95vw;
  height: 18.25vh;
  box-sizing: border-box;
  border-radius: 0.52vw 0.52vw 0 0;
  background-color: #3f0984;
  span {
    font-size: 1.875vw;
    color: white;
  }
  ${flex({ align: "center", justify: "center" })}
`;
export const EnemyTeamHeader = styled.div`
  width: 23.95vw;
  height: 18.25vh;
  box-sizing: border-box;
  border-radius: 0.52vw 0.52vw 0 0;
  background-color: #5d180a;
  span {
    font-size: 1.875vw;
    color: white;
  }
  ${flex({ align: "center", justify: "center" })}
`;

export const User1 = styled.div`
  width: 14.58vw;
  height: 35.41vw;
  padding: 2.6vw 7.81vw 0 0;
  /* background-color: red; */
  ${flex({ align: "center", direction: "column" })}
`;

export const User2 = styled.div`
  width: 14.58vw;
  height: 35.41vw;
  padding: 0 0 0 7.81vw;
  /* background-color: blue; */
  ${flex({ align: "center", direction: "column" })}
`;

export const UserImg = styled.div`
  width: 10.41vw;
  height: 10.41vw;
  outline: 0.05vw solid #3f0984;
  outline-offset: -0.05vw;
  border-radius: 5.2vw;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const UserName = styled.span`
  width: 11.45vw;
  height: 2.6vw;
  border-radius: 5.2vw;
  font-size: 1.25vw;
  margin: -1vw;
  outline: 0.05vw solid #3f0984;
  outline-offset: -0.05vw;
  background-color: white;
  color: #3f0984;
  ${flex({ align: "center", justify: "center" })}
`;

export const UserImg2 = styled.div`
  width: 10.41vw;
  height: 10.41vw;
  outline: 0.05vw solid #5d180a;
  outline-offset: -0.05vw;
  border-radius: 5.2vw;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const UserName2 = styled.span`
  width: 11.45vw;
  height: 2.6vw;
  border-radius: 5.2vw;
  font-size: 1.25vw;
  margin: -1vw;
  outline: 0.05vw solid #5d180a;
  outline-offset: -0.05vw;
  background-color: white;
  color: #5d180a;
  ${flex({ align: "center", justify: "center" })};
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
