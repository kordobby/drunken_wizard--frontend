import styled from "styled-components";
import flex from "../Components/GlobalStyled/flex";
import { NoticeIcon } from "../Components/ingameComponents/InGameStyled/InGameStyled";

/* types */
import { OneBtnModalProps } from "../typings/typedb";

const OneBtnModal = ({
  headerText,
  upperText,
  lowerText,
  confirmText,
  clickFunc,
}: OneBtnModalProps) => {
  return (
    <StAlertWrap>
      <StAlertBox>
        <NoticeIcon>!</NoticeIcon>
        <span className="modal__title">{headerText}</span>
        <AlertTextBox>
          <span>{upperText}</span>
          <span>{lowerText}</span>
        </AlertTextBox>
        <ModalBtn onClick={clickFunc}>{confirmText}</ModalBtn>
      </StAlertBox>
    </StAlertWrap>
  );
};

/* 사용방법
      <OneBtnModal
        headerText="안녕하세요"
        upperText="네네"
        lowerText="네네네"
        confirmText="확인"
        clickFunc={}
      ></OneBtnModal>
*/
const StAlertWrap = styled.div`
  ${flex({ justify: "center", align: "center" })};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.1);
  position: fixed;
  z-index: 10;
`;

const StAlertBox = styled.div`
  ${flex({ direction: "column", justify: "flex-start", align: "center" })};
  width: 41.66vw;
  height: 21.875vw;
  background-color: white;
  font-size: 1.875vw;
  border: 0.104vw solid var(--purple-1);
  border-radius: 0.833vw;
  box-sizing: border-box;
  padding-top: 1.5625vw;
  position: relative;
  .modal__title {
    margin-top: 1.5625vw;
    font-weight: 700;
  }
`;

const AlertTextBox = styled.div`
  ${flex({ direction: "column", justify: "center", align: "center" })};
  width: 41.66vw;
  height: 7.8125vw;
  color: var(--purple-1);
  span {
    color: var(--purple-1);
    font-size: 1.875vw;
  }
`;

const ModalBtn = styled.button`
  background-color: var(--purple-1);
  color: white;
  font-size: 1.875vw;
  font-family: "국립박물관문화재단클래식B";
  width: 41.66vw;
  height: 5.208vw;
  border-bottom-right-radius: 0.83vw;
  border-bottom-left-radius: 0.83vw;
  ${flex({ justify: "center", align: "center" })};
  position: absolute;
  bottom: 0;
  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }
`;

export default OneBtnModal;
