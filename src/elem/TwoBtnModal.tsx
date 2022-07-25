import styled from "styled-components";
import flex from "../Components/GlobalStyled/flex";
import { TwoBtnProps } from "../typings/typedb";
const TwoBtnModal = ({
  confirmText,
  cancelText,
  titleText,
  upperText,
  lowerText,
  confirmFunc,
  cancelFunc,
}: TwoBtnProps) => {
  return (
    <StModalWrap>
      <StModalBox>
        <ContentBox>
          <ModalTitle>{titleText}</ModalTitle>
          <span className="modal__text">{upperText}</span>
          <span className="modal__text">{lowerText}</span>
        </ContentBox>
        <BtnBox>
          <ConfirmBtn onClick={confirmFunc}>{confirmText}</ConfirmBtn>
          <CancelBtn onClick={cancelFunc}>{cancelText}</CancelBtn>
        </BtnBox>
      </StModalBox>
    </StModalWrap>
  );
};

/*
 ## 사용 방법
  - 모달 내용에 넣고싶은 내용을 string으로 넣어주세요.
  - 확인/취소 버튼에 들어갈 함수는
    <TwoBtnModal
      titleText="교체하기"
      upperText="[user_01] 님과"
      lowerText="팀을 교체하시겠습니까?"
      confirmText="확인"
      cancelText="취소"
      confirmFunc={confirmFunction} // 함수는 사용할 함수를 보내주세요.
      cancelFunc={cancelFunction} // 모달 창 닫을 useState 함수 보내주세요.
    />
*/

const StModalWrap = styled.div`
  ${flex({ justify: "center", align: "center" })};
  width: 100vw;
  height: 100vh;
  background-color: white;
  /* opacity: 0.2; */
  position: fixed;
  z-index: 10;
`;

const StModalBox = styled.div`
  width: 540px;
  height: 300px;
  background-color: white;
  border: 2px solid var(--purple-1);
  border-radius: 16px;
`;

const ContentBox = styled.div`
  width: 540px;
  height: 200px;
  ${flex({ direction: "column", justify: "center", align: "center" })};
  .modal__text {
    font-size: 24px;
    margin-top: 18px;
  }
`;

const ModalTitle = styled.span`
  font-size: 36px;
  color: var(--purple-1);
  margin-bottom: 16px;
`;

const BtnBox = styled.div`
  width: 540px;
  height: 100px;
  ${flex({})};
  font-size: 36px;
`;

const ConfirmBtn = styled.div`
  width: 270px;
  height: 100px;
  background-color: var(--purple-1);
  border-bottom-left-radius: 14px;
  ${flex({ justify: "center", align: "center" })};
  color: white;
`;

const CancelBtn = styled.div`
  width: 270px;
  height: 100px;
  border-bottom-right-radius: 14px;
  border: 1px solid var(--purple-1);
  color: var(--purple-1);
  ${flex({ justify: "center", align: "center" })};
`;
export default TwoBtnModal;
