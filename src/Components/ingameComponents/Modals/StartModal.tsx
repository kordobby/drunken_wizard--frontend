/* Package */
import { useState, useEffect } from "react";

/* Modules */
import { StartModalProps } from "../../../typings/typedb";

/* Components */
import { StModalWrap } from "../InGameStyled";

const StartModal = ({ setStatus }: StartModalProps) => {
  console.log("렌더링 테스트: Start Modal Component");
  const [BtnActive, setBtnActive] = useState<boolean>(true);

  // 유저 접속 텀을 고려해서, 5초 뒤에 버튼 활성화
  useEffect(() => {
    setTimeout(() => {
      setBtnActive(false);
    }, 5000);
  }, []);

  return (
    <StModalWrap>
      {BtnActive ? (
        <h1>유저들이 들어오는 중이랍니다!</h1>
      ) : (
        <h1>선빵필승! 제일 먼저 게임 시작을 눌러주세요!</h1>
      )}
      <button
        disabled={BtnActive}
        onClick={() => {
          setStatus("READY");
        }}
      >
        sendStart
      </button>
    </StModalWrap>
  );
};

export default StartModal;
