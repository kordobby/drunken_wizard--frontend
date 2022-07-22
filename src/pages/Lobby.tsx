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
import {
  Button,
  CancelButton,
  Header,
  LobbyWrap,
  LogoutBox,
  LogoutButton,
  LogoutQ,
  LogoutWrap,
  ModalContainer,
  SideBar,
  WrapBack,
} from "../Components/LobbyComponents/LobbyStyled";
import LogoutBtn from "../elem/Button";
// svgs
import header from "../images/lobby/header.svg";
import roomout from "../images/lobby/roomout.svg";
import Back from "../images/background/lobbybackground.png";

import { useModal } from "../hooks/useModal";

import { ButtonBox } from "../Components/UserComponents/UserStyled";
import { DefaultBtnL } from "../Components/Common/CommonStyle";

const Lobby = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [createRoomModal, setCreateRoomMoadl] = useModal<boolean>(false);
  const [logoutModal, setlogoutMoadl] = useModal<boolean>(false);

  const logoutHandler = () => {
    deleteCookie("token");
    deleteCookie("id");
    deleteCookie("username");
    deleteCookie("nickname");
    navigate("/login");
  };

  return (
    <WrapBack style={{ backgroundImage: `url(${Back})` }}>
      {logoutModal && (
        <ModalContainer>
          <LogoutWrap
            onClick={(e: any) => {
              setlogoutMoadl(e);
            }}
          >
            <LogoutBox>
              <LogoutQ>정말 로그아웃 하시겠습니까?</LogoutQ>
              <span>로그인 화면으로 돌아갑니다.</span>
              <ButtonBox>
                <LogoutButton onClick={logoutHandler}>확인</LogoutButton>
                <CancelButton onClick={setlogoutMoadl}>취소</CancelButton>
              </ButtonBox>
            </LogoutBox>
          </LogoutWrap>
        </ModalContainer>
      )}
      {createRoomModal && <CreateRoom modalHandler={setCreateRoomMoadl} />}
      <Header style={{ backgroundImage: `url(${header})` }}>
        <LogoutBtn modalHandler={setlogoutMoadl}></LogoutBtn>
      </Header>
      <LobbyWrap>
        <Rooms />
        <SideBar>
          <LobbyChat />
          <DefaultBtnL
            disabled={false}
            onClick={(e: any) => {
              setCreateRoomMoadl(e);
            }}
          >
            <span>방만들기</span>
          </DefaultBtnL>
        </SideBar>
      </LobbyWrap>
    </WrapBack>
  );
};

export default Lobby;
