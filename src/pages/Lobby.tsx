import React, { useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// hooks
import { deleteCookie } from "../shared/Cookies";
// components
import CreateRoom from "../Components/LobbyComponents/CreateRoom";
import LobbyChat from "../Components/LobbyComponents/LobbyChat";
import Rooms from "../Components/LobbyComponents/Rooms";
// css
import { LogoutBtn } from "../Components/LobbyComponents/LobbyStyled";
import { Header } from "../Components/LobbyComponents/LobbyStyled";
// svgs
import header from "../images/lobby/header.svg";
import logout from "../images/buttons/BTN_logout.svg";
import roomout from "../images/lobby/roomout.svg";
import Back from "../images/background/lobbybackground.png";
import flex from "../Components/GlobalStyled/flex";

const Lobby = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [createRoomModal, setCreateRoomMoadl] = useState<boolean>(false);
  const [logoutModal, setlogoutMoadl] = useState<boolean>(false);

  const modalOpen = useCallback(() => {
    setCreateRoomMoadl(!createRoomModal);
    document.body.style.overflow = "hidden";
  }, [createRoomModal]);

  const modalClose = useCallback(() => {
    setCreateRoomMoadl(!createRoomModal);
    document.body.style.overflow = "unset";
  }, [createRoomModal]);

  const logModalOpen = useCallback(() => {
    setlogoutMoadl(!logoutModal);
    document.body.style.overflow = "hidden";
  }, [logoutModal]);

  const logModalClose = useCallback(() => {
    setlogoutMoadl(!logoutModal);
    document.body.style.overflow = "unset";
  }, [logoutModal]);

  const logoutHandler = () => {
    deleteCookie("token");
    deleteCookie("id");
    deleteCookie("username");
    deleteCookie("nickname");
    alert("로그아웃 되었습니다!");
    navigate("/login");
  };

  return (
    <Main style={{ backgroundImage: `url(${Back})` }}>
      {/* <Main> */}
      {createRoomModal && <CreateRoom modalClose={modalClose} />}
      <Header style={{ backgroundImage: `url(${header})` }}>
        <LogoutBtn onClick={logoutHandler}>
          <img src={logout} />
        </LogoutBtn>
      </Header>
      <button
        onClick={() => {
          queryClient.invalidateQueries(["room_list"]);
        }}
      >
        리패치
      </button>
      {/* <LogoutWrap>
        <LogoutBox></LogoutBox>
      </LogoutWrap> */}
      <LobbyWrap>
        <Rooms />
        <SideBar>
          <LobbyChat />
          <Button
            onClick={modalOpen}
            style={{ backgroundImage: `url(${roomout})` }}
          ></Button>
        </SideBar>
      </LobbyWrap>
    </Main>
  );
};

export default Lobby;

const Main = styled.div`
  width: 100vw;
  z-index: -10000;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const LobbyWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: stretch;
`;
const SideBar = styled.div`
  width: 350px;
  height: 940px;
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  align-items: center;
  background-color: rgba(45, 5, 90, 0.1);
`;
const Button = styled.div`
  width: 330px;
  height: 100px;
  margin: 15px auto;
  display: flex;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;
// const LogoutWrap = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: stretch;
// `;
export const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${flex({ align: "center", justify: "center" })}
  position: absolute;
`;

const LogoutWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(1px);
  z-index: 9999;
`;
const LogoutBox = styled.div`
  width: 540px;
  height: 300px;
  ${flex({ direction: "column", align: "center", justify: "center" })};
  border: 2px solid #3f0984;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: #fff;
  z-index: 10000;
`;

const LogoutButton = styled.button`
  width: 570px;
  height: 100px;
  font-size: 36px;
  color: white;
  background-color: #3f0984;
`;
