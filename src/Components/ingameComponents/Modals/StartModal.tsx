/* Package */
import { useState, useEffect } from "react";

/* Modules */
import { StartModalProps } from "../../../typings/typedb";
import useSound from "use-sound";
/* Components */
import { BeerIcons, StartDiv } from "../InGameStyled/InGameStyled";
import { DefaultBtnL } from "../../Common/CommonStyle";
import btnSound from "../../../sounds/turn.mp3";
import Loading from "../../../pages/Loading";
const StartModal = ({ setStatus }: StartModalProps) => {
  const [BtnActive, setBtnActive] = useState<boolean>(true);
  const [play] = useSound(btnSound);
  // 유저 접속 텀을 고려해서, 5초 뒤에 버튼 활성화
  useEffect(() => {
    setTimeout(() => {
      play();
      setStatus("READY");
    }, 5000);
  }, []);

  return (
    <>
      <Loading></Loading>
      {/* <DefaultBtnL
        disabled={BtnActive}
        onClick={() => {
          play();
          setStatus("READY");
        }}
      >
        <span>Start!</span>
      </DefaultBtnL> */}
      {/* <BeerIcons></BeerIcons>
      <StartDiv>
        <span className="start__notice">선빵필승!</span>
        <span className="start__notice start__notice--btm">
          제일 먼저 게임 스타트를 눌러보세요!
        </span> */}
      {/* </StartDiv> */}
    </>
  );
};

export default StartModal;
