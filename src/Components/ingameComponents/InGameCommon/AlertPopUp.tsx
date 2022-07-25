import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import { NoticeIcon, DrawModalHeader } from "../InGameStyled/InGameStyled";
import { IngameAlertProps } from "../../../typings/typedb";
const AlertPopUp = ({
  upperText,
  middleText,
  bottomText,
}: IngameAlertProps) => {
  return (
    <StAlertWrap>
      <StAlertBox>
        <NoticeIcon>!</NoticeIcon>
        <AlertTextBox>
          <span>{upperText}</span>
          <span>{middleText}</span>
          <span>{bottomText}</span>
        </AlertTextBox>
      </StAlertBox>
    </StAlertWrap>
  );
};

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
  ${flex({ direction: "column", justify: "center", align: "center" })};
  width: 800px;
  height: 270px;
  background-color: white;
  font-size: 36px;
  border: 2px solid var(--purple-1);
  border-radius: 16px;
  box-sizing: border-box;
  padding-top: 20px;
`;

const AlertTextBox = styled.div`
  ${flex({ direction: "column", justify: "space-around", align: "center" })};
  width: 800px;
  height: 150px;
  color: var(--purple-1);
  margin-top: 15px;
  span {
    color: var(--purple-1);
    font-size: 36px;
  }
`;

export default AlertPopUp;
