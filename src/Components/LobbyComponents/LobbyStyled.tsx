import styled from "styled-components";
import { JoinRoomType } from "../../typings/db";
// css
import flex from "../GlobalStyled/flex";
// img
import chatIcon from "../../images/lobby/chat.png";

export const StWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  z-index: -5;
`;

// Header
export const Header = styled.header`
  width: 100vw;
  min-width: 70vw;
  height: 150px;
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${flex({ align: "center", justify: "space-between" })}
`;
export const LogoutBtn = styled.button`
  border: none;
  background-color: transparent;
  margin-left: 50px;
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

// lobby
export const XBox = styled.div`
  width: 100%;
  height: 100%;
  ${flex({ align: "center", justify: "center" })}
`;
export const XImg = styled.img`
  margin: auto;
`;
// creatRoom
export const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${flex({ align: "center", justify: "center" })}
  position: absolute;
`;

export const CreateRoomTitle = styled.div`
  width: 1120px;
  height: 120px;
  ${flex({ align: "center", justify: "center" })};
  border: none;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  background-color: #b68961;
  z-index: 10000;

  span {
    font-size: 48px;
  }
`;
export const CreateRoomBox = styled.div`
  width: 1120px;
  height: 540px;
  ${flex({ direction: "column", align: "center", justify: "center" })};
  border: none;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: #d6b27f;
  z-index: 10000;
`;
export const CreateInput = styled.input`
  width: 940px;
  height: 80px;
  border: none;
  z-index: 10000;
  margin-top: 90px;
  padding: 0 30px;
  font-size: 36px;
`;
export const CreateButton = styled.button`
  width: 330px;
  height: 100px;
  margin: 80px auto 70px auto;
  border: none;
  z-index: 10000;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(1px);
  z-index: 9999;
`;
// room
export const PageButtonBox = styled.div`
  width: 442px;
  height: 83px;
  position: absolute;
  left: 40%;
  bottom: 40px;
  transform: translate(-50%, 0%);
`;

export const PrevButton = styled.button`
  width: 211px;
  height: 83px;
  margin-right: 10px;
  border: none;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;
export const NextButton = styled.button`
  width: 211px;
  height: 83px;
  border: none;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

export const RoomWrap = styled.div`
  width: 70vw;
  margin: 10px 100px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;
export const RoomBox = styled.div<JoinRoomType>`
  width: 720px;
  height: 220px;
  background-color: #b68961;
  border-radius: 24px;
  margin: 15px;
  box-sizing: border-box;
  ${flex({ direction: "column" })};

  &:hover {
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

export const RoomTitle = styled.div`
  width: 720px;
  height: 90px;
  box-sizing: border-box;
  border-radius: 24px 24px 0 0;
  background-color: #5d180a;
  ${flex}
  float: left;
`;
export const RoomNumber = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 20px;
  border-radius: 28px;
  background-color: rgba(217, 217, 217, 1);
  box-shadow: 5px 5px 5px 0.1px gray inset;
  ${flex({ justify: "center" })};

  span {
    font-size: 36px;
    color: #5d180a;
  }
`;
export const RoomName = styled.span`
  font-size: 36px;
  color: white;
  text-shadow: 1px 1px 5px black;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
`;

export const UsersWrap = styled.div`
  width: 100%;
  height: 130px;
  ${flex};
`;
export const RoomUsers = styled.div`
  width: 90px;
  height: 90px;
  margin: 0 5px;
  ${flex({ align: "center" })};
  border-radius: 45px;
  box-shadow: 5px 5px 5px 0.1px black;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const ComeIn = styled.div`
  width: 148px;
  height: 70px;
  margin: 0;
  span {
    color: white;
    font-size: 24px;
    font-weight: 1000;
    margin: auto;
  }

  ${flex({ align: "center" })};
  border-radius: 20px;
  background-color: #d6b27f;
  /* box-shadow: 5px 5px 5px 0.1px black inset; */
`;
export const Impossible = styled.div`
  width: 148px;
  height: 70px;
  margin: 0;
  span {
    color: white;
    font-size: 24px;
    font-weight: 1000;
    margin: auto;
  }

  ${flex({ align: "center" })};
  border-radius: 20px;
  outline: 2px solid #d6b27f;
  outline-offset: -2px;
  background-color: #b68961;
  box-shadow: 5px 5px 5px 0.1px black inset;
`;

export const Team1 = styled.div`
  width: 30%;
  height: 100%;
  margin: 0 0 0 15px;
  display: flex;
  align-items: center;
`;
export const Team2 = styled.div`
  width: 30%;
  height: 100%;
  margin: 0 10px 0 10px;
  display: flex;
  align-items: center;
`;

// chat

export const Wrap = styled.div`
  width: 330px;
  margin-top: 10px;
  ${flex({ direction: "column", align: "center" })}
`;
export const ProfileBox = styled.div`
  width: 330px;
  height: 145px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: #f3f1f5;
  box-shadow: 1px 1px 5px 0.1px black;
  ${flex({ align: "center" })};
`;
export const Profile = styled.div`
  ${flex({ direction: "column", align: "left" })};
`;

export const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  margin-left: 15px;
  border-radius: 50px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ProfileSpan = styled.span`
  margin: 10px 0px 10px 20px;
  font-size: 24px;
  color: #5d180a;
  /* background-color: rgba(183, 39, 39, 0.5); */
`;

export const UserBox = styled.div`
  width: 330px;
  height: 220px;
  box-sizing: border-box;
  border-radius: 12px;
  overflow: auto;
  background-color: #f3f1f5;
  box-shadow: 1px 1px 5px 0.1px black;
  ${flex({ direction: "column", align: "left" })};
`;
export const Users = styled.div`
  margin: 15px;
  span {
    font-size: 24px;
    color: #5d180a;
    margin: auto auto auto 10px;
  }
  /* background-color: rgba(190, 97, 97, 0.5); */
  ${flex({ direction: "row", align: "left", justify: "center" })}
`;

export const UsersImg = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ChatWrap = styled.div`
  width: 300px;
  height: 340px;
  overflow-y: auto;
  /* background-color: rgba(202, 37, 37, 0.5); */
  ${flex({ direction: "column", align: "left" })}
  border-bottom: 2px solid black;
`;

export const ChatBox = styled.div`
  width: 330px;
  height: 420px;
  margin-top: 10px;
  padding-top: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  background-color: #f3f1f5;
  box-shadow: 1px 1px 5px 0.1px black;
  ${flex({ direction: "column", align: "left" })};
`;

export const MyUserBox = styled.div`
  margin: 5px 0 0 80px;
  ${flex({ direction: "column", align: "right" })};
`;

export const ChatUser = styled.div`
  width: 205px;
  margin: 5px 0;
  span {
    margin: auto 0;
    color: rgba(0, 0, 0, 1);
  }
  ${flex({ direction: "row", align: "left" })}
  border-bottom: 2px solid black;
`;
export const MyChat = styled.div`
  width: 220px;
  margin: 5px 0;
  span {
    margin: auto 0;
    color: #3f0984;
  }
  ${flex({ direction: "row", align: "left" })}
  border-bottom: 2px solid black;
`;

export const ChatImg = styled.div`
  margin: 5px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ChatMsg = styled.p`
  margin: 10px 0;
  width: 205px;
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
`;
export const MyMsg = styled.p`
  margin: 10px 0;
  width: 205px;
  font-size: 18px;
  color: #3f0984;
`;
export const JoinUser = styled.div`
  margin: 5px 0;
  width: 300px;
  height: 41px;
  box-sizing: border-box;
  border-radius: 10px;
  span {
    font-size: 14px;
  }
  background-color: #ede4f2;
  ${flex({ align: "center", justify: "center" })}
  color: rgba(0, 0, 0, 1);
`;

export const Input = styled.input`
  width: 290px;
  height: 56px;
  margin: auto;
  padding: 0 10px;
  border-radius: 12px;
  color: #3f0984;
  font-size: 18px;
  background-color: #ede4f2;

  border: none;
  &:focus {
    outline: 2px solid #3f0984;
    outline-offset: -2px;
  }
  ::placeholder {
    background-image: url(${chatIcon});
    background-repeat: no-repeat;
    background-position: 3px center;
    text-align: left;
    text-indent: 38px;
  }
`;
