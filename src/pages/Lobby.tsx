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
import Back from "../images/background/lobbyBackground.png";
import TwoBtnModal from "../elem/TwoBtnModal";
import HeaderBtn from "../elem/HeaderBtn";

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
    deleteCookie("imageNum");
    navigate("/login");
  };

  return (
    <WrapBack style={{ backgroundImage: `url(${Back})` }}>
      {logoutModal && (
        <ModalBack
          onClick={(e: any) => {
            setlogoutMoadl(e);
          }}
        >
          <TwoBtnModal
            confirmText={"확인"}
            cancelText={"취소"}
            titleText={"로그아웃 하시겠습니까?"}
            upperText={"처음 로그인 화면으로 돌아갑니다."}
            lowerText={""}
            confirmFunc={logoutHandler}
            cancelFunc={setlogoutMoadl}
          />
        </ModalBack>
      )}
      {createRoomModal && <CreateRoom modalHandler={setCreateRoomMoadl} />}
      <Header>
        <HeaderBtn clickFunc={setlogoutMoadl} text={"Logout"} />
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
