import styled from "styled-components";
import flex from "../GlobalStyled/flex";
const TwoBtnModal = () => {
  return (
    <StModalWrap>
      <div className="modal">
        <StLowerModal>
          <StModalTwoBtn>
            <span>확인</span>
          </StModalTwoBtn>
          <StModalTwoBtn>
            <span>취소</span>
          </StModalTwoBtn>
        </StLowerModal>
      </div>
    </StModalWrap>
  );
};

export default TwoBtnModal;

const StModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  ${flex({ justify: "center", align: "center" })};
  .modal {
    width: 28.125vw;
    height: 15.625vw;
    border: 1px solid var(--purple-1);
  }
`;

const StUpperModal = styled.div``;

const StLowerModal = styled.div`
  width: 28.125vw;
  height: 5.208vw;
`;

const StModalTwoBtn = styled.div`
  height: 5.208vw;
  background-color: var(--purple-1);
`;
