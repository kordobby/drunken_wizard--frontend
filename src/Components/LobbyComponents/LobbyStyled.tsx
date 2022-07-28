import styled from "styled-components";
import { ImgNumType, JoinRoomType, ModalDivProps } from "../../typings/db";
// css
import flex from "../GlobalStyled/flex";
// img
import chatIcon from "../../images/lobby/chat.png";
import header from "../../images/imgs/header.png";
import vs from "../../images/imgs/vs.png";
import x from "../../images/lobby/x.png";
import team1 from "../../images/lobby/team1.png";
import team2 from "../../images/lobby/team2.png";
import teamX1 from "../../images/lobby/teamX1.png";
import teamX2 from "../../images/lobby/teamX2.png";
import lobbyBack from "../../images/background/lobbybackground.png";
import { pageProps, TeamProps } from "../../typings/typedb";
import matchProfileImg from "./Team";
import left from "../../images/buttons/BTN_left.png";
import leftEnd from "../../images/buttons/BTN_leftend.png";
import right from "../../images/buttons/BTN_right.png";
import rightEnd from "../../images/buttons/BTN_rightend.png";

// lobby
export const WrapBack = styled.div`
  width: 100vw;
  z-index: -10000;
  background-image: url(${lobbyBack});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const LobbyWrap = styled.div`
  width: 100vw;
  height: 87.03vh;
  ${flex({ align: "center", justify: "center" })}
`;
export const SideBar = styled.div`
  width: 18.2vw;
  height: 87.03vh;
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  align-items: center;
  background-color: #e6e2eb;
`;

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100%;
  ${flex({ align: "center", justify: "center" })}
  position: absolute;
`;

export const ModalBack = styled.div<ModalDivProps>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0.8vw 1.6vw 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(1px);
  ${flex({ align: "center", justify: "center" })}
  z-index: 9999;
`;

export const LogoutBox = styled.div`
  width: 28.125vw;
  height: 27.77vh;
  outline: 2px solid #3f0984;
  outline-offset: -2px;
  border-radius: 0.8vw;
  box-shadow: 0 0 1.56vw rgba(30, 30, 30, 0.185);
  background-color: #fff;
  z-index: 10000;
`;

export const LogoutQBox = styled.div`
  width: 28vw;
  height: 18.51vh;
  ${flex({ direction: "column" })};
`;

export const LogoutQ = styled.span`
  font-size: 1.875vw;
  margin-top: 4.125vw;
`;
export const LogoutQ2 = styled.span`
  font-size: 1.25vw;
  margin-top: 1.125vw;
`;

export const LogoutButton = styled.button`
  width: 14vw;
  height: 9.25vh;
  font-size: 1.875vw;
  border-radius: 0 0 0 0.8vw;
  color: white;
  background-color: #3f0984;
  border-top: 2px solid #3f0984;
  border-right: 1px solid #3f0984;
  &:hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;

export const CancelButton = styled.button`
  width: 14vw;
  height: 9.25vh;
  font-size: 1.875vw;
  border-radius: 0 0 0.8vw 0;
  color: #3f0984;
  background-color: white;
  border-top: 2px solid #3f0984;
  border-left: 1px solid #3f0984;
  &:hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;

// Header
export const Header = styled.header`
  width: 100vw;
  height: 12.96vh;
  display: flex;
  background-image: url(${header});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  ${flex({ align: "center", justify: "space-between" })}
`;
export const LogoutBtn = styled.button`
  border: none;
  background-color: transparent;
  margin-left: 2.6vw;
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

// lobby
export const XWrap = styled.div`
  width: 81.77vw;
  height: 87.03vh;
  ${flex({ align: "center", justify: "center" })}
`;
export const XBox = styled.div`
  width: 40.1vw;
  height: 30.55vh;
  border-radius: 1.66vw;
  background-color: white;
  opacity: 0.8;
  span {
    font-size: 2.5vw;
    color: #5d180a;
  }
  ${flex({ align: "center", justify: "center", direction: "column" })}
`;

export const XImg = styled.img.attrs({
  src: `${x}`,
})`
  margin-bottom: 4.62vh;
  width: 5.72vw;
  height: 5.72vw;
`;

// creatRoom
export const CreateRoomTitle = styled.div`
  width: 57.81vw;
  height: 6.25vw;
  ${flex({ align: "center", justify: "center" })};
  border: none;
  border-radius: 0.83vw 0.83vw 0 0;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  background-color: #b68961;
  z-index: 10000;

  span {
    font-size: 2.5vw;
  }
`;
export const CreateRoomBox = styled.div`
  width: 58.33vw;
  height: 28.125vw;
  ${flex({ direction: "column", align: "center" })};
  border: 0.26vw solid white;
  border-radius: 0.83vw;
  box-shadow: 0 0 1.5625vw rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: #d6b27f;
  z-index: 10000;
`;
export const CreateInput = styled.input`
  width: 48.95vw;
  height: 4.16vw;
  border: none;
  z-index: 10000;
  margin: 4.68vw auto 2.68vw auto;
  padding: 0 1.5625vw;
  font-size: 1.87vw;
  font-family: "국립박물관문화재단클래식B";
`;
export const ButtonBox = styled.div`
  width: 32vw;
  height: 9.25vh;
  ${flex({ direction: "row" })}
`;

// room
export const PageButtonBox = styled.div`
  width: 81.77vw;
  height: 12.96vh;
  ${flex({ align: "center", justify: "center" })};
`;

export const PrevButton = styled.button<pageProps>`
  width: 10.98vw;
  height: 4.32vw;
  margin-right: 0.52vw;
  border: none;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => (props.page ? left : leftEnd)});
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 0.52vw 0.1vw #fd6f33;
  }
`;

export const NextButton = styled.button<pageProps>`
  width: 10.98vw;
  height: 4.32vw;
  border: none;
  margin-left: 0.52vw;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => (props.page ? right : rightEnd)});
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 0.52vw 0.1vw #fd6f33;
  }
`;

export const RoomWrap = styled.div`
  width: 81.77vw;
  height: 87.03vh;
  box-sizing: border-box;
  ${flex({ align: "center", justify: "center", direction: "column" })};
  /* flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex; */
`;

export const RoomBoxWrap = styled.div`
  width: 77.24vw;
  height: 71.5vh;
  margin-top: 1.85vh;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const RoomBox = styled.div<JoinRoomType>`
  width: 37.5vw;
  height: 21vh;
  border: 0.26vw solid white;
  background-color: #b68961;
  border-radius: 1.25vw;
  margin: 0.56vw;
  box-sizing: border-box;
  &:hover {
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
  ${flex({ direction: "column" })};
`;

export const RoomTitle = styled.div`
  width: 36.98vw;
  height: 8.33vh;
  box-sizing: border-box;
  border-radius: 1vw 1vw 0 0;
  background-color: #5d180a;
  ${flex}
  float: left;
`;

export const RoomNumber = styled.div`
  width: 2.91vw;
  height: 2.91vw;
  margin: 0 1vw;
  border-radius: 1.458vw;
  background-color: rgba(217, 217, 217, 1);
  box-shadow: 0.26vw 0.26vw 0.26vw 0.1px gray inset;
  ${flex({ justify: "center" })};
  span {
    font-size: 1.875vw;
    color: #5d180a;
  }
`;
export const RoomName = styled.span`
  font-size: 1.875vw;
  color: white;
  text-shadow: 1px 1px 0.26vw black;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
`;

export const UsersWrap = styled.div`
  width: 100%;
  height: 12.03vh;
  ${flex};
`;
export const RoomUsers = styled.div<TeamProps>`
  width: 4.68vw;
  height: 4.68vw;
  margin: 0 0.26vw;
  ${flex({ align: "center" })};
  border-radius: 2.34vw;
  background-image: url(${(props) => (props.team ? team1 : teamX1)});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const RoomUsers2 = styled.div<TeamProps>`
  width: 4.68vw;
  height: 4.68vw;
  margin: 0 0.26vw;
  ${flex({ align: "center" })};
  border-radius: 2.34vw;
  background-image: url(${(props) => (props.team ? team2 : teamX2)});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ComeIn = styled.div`
  width: 7.7vw;
  height: 6.48vh;
  span {
    color: white;
    font-size: 1.25vw;
    font-weight: 1000;
    margin: auto;
  }
  ${flex({ align: "center" })};
  border-radius: 1.041vw;
  background-color: #d6b27f;
`;
export const Impossible = styled.div`
  width: 7.7vw;
  height: 6.48vh;
  span {
    color: white;
    font-size: 1.25vw;
    font-weight: 1000;
    margin: auto;
  }
  ${flex({ align: "center" })};
  border: 0.15vw solid #ffffff;
  border-radius: 1.041vw;
  background-color: transparent;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Team1 = styled.div`
  width: 30%;
  height: 100%;
  margin: 0 0 0 0.78vw;
  display: flex;
  align-items: center;
`;
export const Team2 = styled.div`
  width: 30%;
  height: 100%;
  margin: 0 0.52vw 0 0.52vw;
  display: flex;
  align-items: center;
`;

export const VSImgRoom = styled.img.attrs({
  src: `${vs}`,
})`
  width: 3.75vw;
  height: 10.33vh;
`;

// chat
export const Wrap = styled.div`
  width: 17.18vw;
  margin-top: 0.92vh;
  ${flex({ direction: "column", align: "center" })}
`;
export const ProfileBox = styled.div`
  width: 17.18vw;
  height: 13.42vh;
  margin-bottom: 0.92vh;
  box-sizing: border-box;
  border-radius: 0.625vw;
  background-color: #f3f1f5;
  box-shadow: 1px 1px 5px 0.1px black;
  ${flex({ align: "center" })};
`;
export const Profile = styled.div`
  ${flex({ direction: "column", align: "left" })};
`;

export const ProfileImg = styled.div<ImgNumType>`
  width: 5.2vw;
  height: 5.2vw;
  margin-left: 0.78vw;
  border-radius: 2.6vw;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => matchProfileImg(props.ImgNum)});
`;

export const ProfileSpan = styled.span`
  margin: 0.52vw 0px 0.52vw 1vw;
  font-size: 1.15vw;
  color: #5d180a;
`;

export const UserBox = styled.div`
  width: 17.18vw;
  height: 20.37vh;
  box-sizing: border-box;
  border-radius: 0.625vw;
  overflow: auto;
  background-color: #f3f1f5;
  box-shadow: 1px 1px 5px 0.1px black;
  ${flex({ direction: "column", align: "left" })};
`;
export const Users = styled.div`
  margin: 0.6vw 0.9vw;
  justify-content: space-between;
  ${flex({ direction: "row", align: "left" })}
`;
export const UserNick = styled.span`
  font-size: 1.1vw;
  color: #5d180a;
  margin: auto auto auto 0.52vw;
`;
export const Playing = styled.span`
  font-size: 0.25vw;
  color: #5d180a;
  margin: 0.6vw;
  float: right;
  ${flex({ direction: "row", align: "center" })}
`;

export const UsersImg = styled.div<ImgNumType>`
  width: 2.18vw;
  height: 2.18vw;
  border-radius: 1.09vw;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => matchProfileImg(props.ImgNum)});
`;

export const ChatWrap = styled.div`
  width: 15.625vw;
  height: 30.55vh;
  overflow: scroll;
  /* background-color: rgba(202, 37, 37, 0.5); */
  ${flex({ direction: "column", align: "left" })}
  border-bottom: 2px solid black;
  box-sizing: border-box;
`;

export const ChatBox = styled.div`
  width: 17.18vw;
  height: 38.88vh;
  margin: 0.92vh 0 0.92vh 0;
  padding-top: 0.92vh;
  border-radius: 0.625vw;
  display: flex;
  align-items: center;
  background-color: #f3f1f5;
  box-shadow: 1px 1px 0.26vw 0.1px black;
  ${flex({ direction: "column", align: "left" })};
`;

export const MyUserBox = styled.div`
  margin: 0.46vh 0 0 0.46vh;
  ${flex({ direction: "column", align: "right" })};
`;

export const ChatUser = styled.div`
  width: 10.67vw;
  margin: 0.46vh 0;
  span {
    font-size: 1vw;
    margin: auto 0;
    color: rgba(0, 0, 0, 1);
  }
  ${flex({ direction: "row", align: "left" })}
  border-bottom: 2px solid black;
`;
export const MyChat = styled.div`
  width: 11.45vw;
  margin: 0.46vh 0 0.46vh 8vh;
  span {
    font-size: 1vw;
    margin: auto 0;
    color: #3f0984;
  }
  ${flex({ direction: "row", align: "left" })}
  border-bottom: 2px solid black;
`;

export const ChatImg = styled.div<ImgNumType>`
  margin: 0.26vw;
  width: 1.875vw;
  height: 1.875vw;
  border-radius: 0.937vw;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => matchProfileImg(props.ImgNum)});
`;

export const ChatMsg = styled.p`
  margin: 0.92vh 0;
  width: 10.67vw;
  font-size: 0.937vw;
  color: rgba(0, 0, 0, 1);
`;
export const MyMsg = styled.p`
  margin: 0.92vh 0 0.92vh 8vh;
  width: 10.67vw;
  font-size: 0.937vw;
  color: #3f0984;
`;
export const JoinUser = styled.div`
  margin: 0.26vw 0;
  width: 15.625vw;
  padding: 1.45vh;
  box-sizing: border-box;
  border-radius: 0.52vw;
  span {
    font-size: 0.72vw;
  }
  background-color: #ede4f2;
  ${flex({ align: "center", justify: "center" })}
  color: rgba(0, 0, 0, 1);
`;

export const Input = styled.input`
  width: 14.1vw;
  height: 5.18vh;
  margin: auto;
  padding: 0 1.02vw;
  border-radius: 0.625vw;
  color: #3f0984;
  font-size: 0.9375vw;
  background-color: #ede4f2;

  border: none;
  &:focus {
    outline: 2px solid #3f0984;
    outline-offset: -2px;
  }
  ::placeholder {
    background-image: url(${chatIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0.15vw center;
    text-align: left;
    text-indent: 1.979vw;
  }
`;
