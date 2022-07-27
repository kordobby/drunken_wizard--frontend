/* Hooks */
import { useNavigate } from "react-router-dom";
/* Interface */
import { useAppSelector } from "../../../hooks/tsHooks";
/* CSS & SC */
import { HeaderWrap } from "../InGameStyled/InGameStyled";
import HeaderBtn from "../../../elem/HeaderBtn";
import HeaderRoomTitle from "../../Common/RoomTitle";
const NoticeField = () => {
  const roomTitle = useAppSelector((state) => state.game.game.roomTitle);
  console.log(roomTitle);

  // send StompMsg for leaveRoom
  const navigate = useNavigate();
  const leaveRoomHandler = () => {
    navigate("/lobby");
    // 해당 방에 대한 구독취소 걸어주기
  };

  return (
    <>
      <HeaderWrap>
        <HeaderBtn text="방 나가기" clickFunc={leaveRoomHandler} />
        <HeaderRoomTitle text={roomTitle} />
      </HeaderWrap>
    </>
  );
};

export default NoticeField;
