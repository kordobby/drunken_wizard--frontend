import styled from "styled-components";
import flex from "../Components/GlobalStyled/flex";
import { OneBtnModalProps } from "../typings/typedb";
import {
  NoticeIcon,
  DrawModalHeader,
} from "../Components/IngameComponents/InGameStyled/InGameStyled";

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
        <span className="modal__title">asdfasf</span>
        <AlertTextBox>
          <span>asdf</span>
          <span>asdf</span>
        </AlertTextBox>
        <ModalBtn onClick={clickFunc}>확인</ModalBtn>
      </StAlertBox>
    </StAlertWrap>
  );
};

/*
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
  width: 800px;
  height: 420px;
  background-color: white;
  font-size: 36px;
  border: 2px solid var(--purple-1);
  border-radius: 16px;
  box-sizing: border-box;
  padding-top: 30px;
  position: relative;
  .modal__title {
    margin-top: 30px;
    font-weight: 700;
  }
`;

const AlertTextBox = styled.div`
  ${flex({ direction: "column", justify: "center", align: "center" })};
  width: 800px;
  height: 150px;
  color: var(--purple-1);
  span {
    color: var(--purple-1);
    font-size: 36px;
  }
`;

const ModalBtn = styled.div`
  background-color: var(--purple-1);
  color: white;
  font-size: 36px;
  width: 800px;
  height: 100px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  ${flex({ justify: "center", align: "center" })};
  position: absolute;
  bottom: 0;
`;

export default OneBtnModal;
