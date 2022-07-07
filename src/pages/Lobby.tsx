import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// components
import CreateRoom from "../Components/LobbyComponents/CreateRoom";
import LobbyChat from "../Components/LobbyComponents/LobbyChat";
import Rooms from "../Components/LobbyComponents/Rooms";

const Lobby = () => {
  const [createRoomModal, setCreateRooMoadl] = useState<boolean>(false);

  const modalOpen = useCallback(() => {
    setCreateRooMoadl(!createRoomModal);
    document.body.style.overflow = "hidden";
  }, [createRoomModal]);

  const modalClose = useCallback(() => {
    setCreateRooMoadl(!createRoomModal);
    document.body.style.overflow = "unset";
  }, [createRoomModal]);

  return (
    <Main>
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
      <Rooms />
      <LobbyChat />
    </Main>
  );
};

export default Lobby;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;
