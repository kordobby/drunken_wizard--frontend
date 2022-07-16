import React, { useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// hooks
import { deleteCookie, getCookie } from "../shared/Cookies";
// components
import CreateRoom from "../Components/LobbyComponents/CreateRoom";
import LobbyChat from "../Components/LobbyComponents/LobbyChat";
import {
  LogoutBtn,
  NickName,
  Record,
  UserInfo,
} from "../Components/LobbyComponents/LobbyStyled";
import Rooms from "../Components/LobbyComponents/Rooms";
// css
import { Header } from "../Components/LobbyComponents/LobbyStyled";
// svgs
import header from "../images/lobby/header.svg";
import logout from "../images/lobby/logout.svg";
import roomout from "../images/lobby/roomout.svg";
import Back from "../images/background/ruleBackground.svg";

const Lobby = () => {
  const navigate = useNavigate();
  const accessNick = getCookie("nickname");
  const queryClient = useQueryClient();
  const [createRoomModal, setCreateRoomMoadl] = useState<boolean>(false);

  const modalOpen = useCallback(() => {
    setCreateRoomMoadl(!createRoomModal);
    document.body.style.overflow = "hidden";
  }, [createRoomModal]);

  const modalClose = useCallback(() => {
    setCreateRoomMoadl(!createRoomModal);
    document.body.style.overflow = "unset";
  }, [createRoomModal]);

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
      {createRoomModal && <CreateRoom modalClose={modalClose} />}
      <Header style={{ backgroundImage: `url(${header})` }}>
        <LogoutBtn onClick={logoutHandler}>
          <img src={logout} />
        </LogoutBtn>
      </Header>
      <button
        onClick={() => {
          queryClient.invalidateQueries("room_list");
        }}
      >
        리패치
      </button>
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
  height: 100vh;
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
  height: 100%;
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  align-items: center;
  /* background-color: rgba(45, 5, 90, 0.1); */
`;
const Button = styled.div`
  width: 330px;
  height: 100px;
  display: flex;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;
