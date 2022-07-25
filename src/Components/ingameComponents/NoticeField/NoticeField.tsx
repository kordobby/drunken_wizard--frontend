/* Hooks */
import { useNavigate } from "react-router-dom";
/* Interface */

/* CSS & SC */
import { HeaderWrap } from "../InGameStyled/InGameStyled";
import HeaderBtn from "../../../elem/HeaderBtn";

const NoticeField = () => {
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
        {/* 서버에서 가능하다고하면 방 제목 넣기 */}
      </HeaderWrap>
    </>
  );
};

export default NoticeField;
