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
import { Header } from "../Components/LobbyComponents/LobbyStyled";
import LogoutBtn from "../elem/Button";
// svgs
import header from "../images/lobby/header.svg";
// import logout from "../images/buttons/BTN_logout.svg";
import roomout from "../images/lobby/roomout.svg";
import Back from "../images/background/lobbyBackground.png";
import flex from "../Components/GlobalStyled/flex";
import { useModal } from "../hooks/useModal";
import { ModalDivProps } from "../typings/db";

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
    <Main style={{ backgroundImage: `url(${Back})` }}>
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
      {createRoomModal && <CreateRoom modalClose={setCreateRoomMoadl} />}
      <Header style={{ backgroundImage: `url(${header})` }}>
        <LogoutBtn onClick={setlogoutMoadl}>
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
      <LobbyWrap>
        <Rooms />
        <SideBar>
          <LobbyChat />
          <Button
            onClick={(e: any) => {
              setCreateRoomMoadl(e);
            }}
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
  background-color: #e6e2eb;
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

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${flex({ align: "center", justify: "center" })}
  position: absolute;
`;

const LogoutWrap = styled.div<ModalDivProps>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(1px);
  ${flex({ align: "center", justify: "center" })}
  z-index: 9999;
`;

const LogoutBox = styled.div`
  width: 540px;
  height: 300px;
  span {
    font-size: 24px;
  }
  ${flex({ direction: "column", align: "center", justify: "space-between" })};
  outline: 2px solid #3f0984;
  outline-offset: -2px;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: #fff;
  z-index: 10000;
`;

const LogoutQ = styled.span`
  font-size: 36px !important;
  margin-top: 60px;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const LogoutButton = styled.button`
  width: 270px;
  height: 100px;
  font-size: 36px;
  border-radius: 0 0 0 16px;
  color: white;
  background-color: #3f0984;
  border-top: 2px solid #3f0984;
  border-right: 1px solid #3f0984;

  &:hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;
const CancelButton = styled.button`
  width: 270px;
  height: 100px;
  font-size: 36px;
  border-radius: 0 0 16px 0;
  color: #3f0984;
  background-color: white;
  border-top: 2px solid #3f0984;
  border-left: 1px solid #3f0984;
  &:hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;
