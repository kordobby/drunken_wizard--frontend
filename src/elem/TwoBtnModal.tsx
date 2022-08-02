import styled from "styled-components";
import flex from "../Components/GlobalStyled/flex";
/* types */
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

export const StModalWrap = styled.div`
  ${flex({ justify: "center", align: "center" })};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.3);
  position: fixed;
  z-index: 10;
`;

const StModalBox = styled.div`
  width: 28.125vw;
  height: 15.625vw;
  outline: 0.2vw solid var(--purple-1);
  outline-offset: -0.2vw;
  background-color: white;
  border-radius: 0.83vw;
`;

const ContentBox = styled.div`
  width: 28.125vw;
  height: 10.416vw;
  ${flex({ direction: "column", justify: "center", align: "center" })};
  .modal__text {
    font-size: 1.25vw;
    margin-top: 0.9375vw;
  }
`;

const ModalTitle = styled.span`
  font-size: 1.875vw;
  color: var(--purple-1);
  margin-bottom: 0.833vw;
`;

const BtnBox = styled.div`
  width: 28.125vw;
  height: 5.208vw;
  ${flex({})};
  font-size: 1.875vw;
`;

const ConfirmBtn = styled.button`
  width: 14.5625vw;
  height: 5.208vw;
  background-color: var(--purple-1);
  border-bottom-left-radius: 0.729vw;
  ${flex({ justify: "center", align: "center" })};
  color: white;
  font-size: 1.875vw;
  font-family: "국립박물관문화재단클래식B";
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
  }
`;

const CancelBtn = styled.button`
  width: 14.5625vw;
  height: 5.208vw;
  border-bottom-right-radius: 0.729vw;
  border: 1px solid var(--purple-1);
  color: var(--purple-1);
  font-size: 1.875vw;
  font-family: "국립박물관문화재단클래식B";
  ${flex({ justify: "center", align: "center" })};
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }
`;
export default TwoBtnModal;
