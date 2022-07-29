/* Hooks */
import { useNavigate } from "react-router-dom";
/* Interface */
import { useAppSelector } from "../../../hooks/tsHooks";
/* CSS & SC */
import { Header } from "../../waitingRoomCP/WaitingRoomStyled";
import HeaderBtn from "../../../elem/HeaderBtn";
import HeaderRoomTitle from "../../Common/RoomTitle";
import { NoticeProps } from "../../../typings/typedb";
const NoticeField = ({ setRoomOutModal }: NoticeProps) => {
  const roomTitle = useAppSelector((state) => state.game.game.roomTitle);

  // send StompMsg for leaveRoom
  const navigate = useNavigate();
  const leaveRoomHandler = () => {
    navigate("/lobby");
    // 해당 방에 대한 구독취소 걸어주기
  };

  return (
    <>
      <Header>
        <HeaderBtn text="방 나가기" clickFunc={() => setRoomOutModal(true)} />
        <HeaderRoomTitle text={roomTitle} />
      </Header>
    </>
  );
};

export default NoticeField;
