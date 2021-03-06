/* Package */
import { useState, useEffect } from "react";

/* Modules */
import { StartModalProps } from "../../../typings/typedb";

/* Components */
import { BeerIcons, StartDiv } from "../InGameStyled";
import { DefaultBtnL } from "../../Common/CommonStyle";

const StartModal = ({ setStatus }: StartModalProps) => {
  const [BtnActive, setBtnActive] = useState<boolean>(true);

  // 유저 접속 텀을 고려해서, 5초 뒤에 버튼 활성화
  useEffect(() => {
    setTimeout(() => {
      setBtnActive(false);
    }, 5000);
  }, []);

  return (
    <>
      <BeerIcons></BeerIcons>
      <StartDiv>
        <span className="start__notice">선빵필승!</span>
        <span className="start__notice start__notice--btm">
          제일 먼저 게임 스타트를 눌러보세요!
        </span>
        <DefaultBtnL
          disabled={BtnActive}
          onClick={() => {
            setStatus("READY");
          }}
        >
          <span>Start!</span>
        </DefaultBtnL>
      </StartDiv>
    </>
  );
};

export default StartModal;
