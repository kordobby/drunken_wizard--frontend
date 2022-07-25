import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
// hooks
import { deleteCookie } from "../shared/Cookies";
import { useModal } from "../hooks/useModal";
// components
import CreateRoom from "../Components/LobbyComponents/CreateRoom";
import LobbyChat from "../Components/LobbyComponents/LobbyChat";
import Rooms from "../Components/LobbyComponents/Rooms";
// css
import {
  CancelButton,
  Header,
  LobbyWrap,
  LogoutBox,
  LogoutButton,
  LogoutQ,
  LogoutQ2,
  LogoutQBox,
  ModalBack,
  ModalContainer,
  SideBar,
  WrapBack,
} from "../Components/LobbyComponents/LobbyStyled";
import { ButtonBox } from "../Components/UserComponents/UserStyled";
import { DefaultBtnL } from "../Components/Common/CommonStyle";
import LogoutBtn from "../elem/Button";
// images
import Back from "../images/background/lobbybackground.png";

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
          <ModalBack
            onClick={(e: any) => {
              setlogoutMoadl(e);
            }}
          ></ModalBack>
          <LogoutBox>
            <LogoutQBox>
              <LogoutQ>로그아웃 하시겠습니까?</LogoutQ>
              <LogoutQ2>처음 로그인 화면으로 돌아갑니다.</LogoutQ2>
            </LogoutQBox>
            <ButtonBox>
              <LogoutButton onClick={logoutHandler}>확인</LogoutButton>
              <CancelButton onClick={setlogoutMoadl}>취소</CancelButton>
            </ButtonBox>
          </LogoutBox>
        </ModalContainer>
      )}
      {createRoomModal && <CreateRoom modalHandler={setCreateRoomMoadl} />}
      <Header>
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
