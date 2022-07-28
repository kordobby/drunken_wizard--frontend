import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { Helmet } from "react-helmet";
// hooks
import { deleteCookie } from "../Shared/Cookies";
import { useModal } from "../hooks/useModal";
// components
import CreateRoom from "../Components/LobbyComponents/CreateRoom";
import LobbyChat from "../Components/LobbyComponents/LobbyChat";
import Rooms from "../Components/LobbyComponents/Rooms";
// css
import {
  Header,
  LobbyWrap,
  ModalBack,
  SideBar,
  WrapBack,
} from "../Components/LobbyComponents/LobbyStyled";
import { DefaultBtnL } from "../Components/Common/CommonStyle";
import TwoBtnModal from "../elem/TwoBtnModal";
import HeaderBtn from "../elem/HeaderBtn";

// sounds
import btnSound from "../sounds/buttonSound.mp3";

const Lobby = () => {
  const navigate = useNavigate();
  const [createRoomModal, setCreateRoomMoadl] = useModal<boolean>(false);
  const [logoutModal, setlogoutMoadl] = useModal<boolean>(false);
  const [play] = useSound(btnSound);

  const logoutHandler = () => {
    deleteCookie("token");
    deleteCookie("id");
    deleteCookie("username");
    deleteCookie("nickname");
    deleteCookie("imageNum");
    navigate("/login");
  };

  return (
    <WrapBack>
      <Helmet>
        <title>Welcome! Drunken Wizard</title>
      </Helmet>
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
      {createRoomModal && (
        <CreateRoom btnSound={play} modalHandler={setCreateRoomMoadl} />
      )}
      <Header>
        <HeaderBtn clickFunc={setlogoutMoadl} text={"Logout"} />
      </Header>
      <LobbyWrap>
        <Rooms btnSound={play} />
        <SideBar>
          <LobbyChat />
          <DefaultBtnL
            disabled={false}
            onClick={(e: any) => {
              play();
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
