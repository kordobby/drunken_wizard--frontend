import React, { useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
import { getCookie } from "../shared/Cookies";
import flex from "../Components/GlobalStyled/flex";

const Lobby = () => {
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

  return (
    <Main>
      <Header style={{ backgroundImage: `url(${header})` }}>
        <LogoutBtn>
          <img src={logout} />
        </LogoutBtn>
        <UserInfo>
          <NickName>{accessNick}</NickName>
          <Record>7승 8패</Record>
        </UserInfo>
      </Header>
      {createRoomModal && <CreateRoom modalClose={modalClose} />}
      <button onClick={modalOpen} style={{ float: "right" }}>
        방만들기
      </button>
      <Link to="/signup">
        <button>회원가입하기</button>
      </Link>
      <Link to="/login">
        <button>로그인하기</button>
      </Link>
      <button
        onClick={() => {
          queryClient.invalidateQueries("room_list");
        }}
      >
        리패치
      </button>
      <LobbyWrap>
        <Rooms />
        <LobbyChat />
      </LobbyWrap>
    </Main>
  );
};

export default Lobby;

const Main = styled.div`
  width: 100%;
  height: 100vh;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;
const LobbyWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: stretch;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;
