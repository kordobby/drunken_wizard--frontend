/* types */
import { IngameAlertProps } from "../../../typings/typedb";

/* css */
import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import { NoticeIcon } from "../InGameStyled/InGameStyled";

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
  width: 41.66vw; // 800px;
  height: 25vh; // 270px;
  background-color: white;
  font-size: 1.875vmax;
  border: 2px solid var(--purple-1);
  border-radius: 0.833vmax;
  box-sizing: border-box;
  padding-top: 1.0416vh;
`;

const AlertTextBox = styled.div`
  ${flex({ direction: "column", justify: "center", align: "center" })};
  width: 41.66vw; // 800px;
  height: 13.88vh; // 150px;
  color: var(--purple-1);
  margin-top: 1.38vh;
  span {
    color: var(--purple-1);
    font-size: 1.875vmax;
    margin-bottom: 1.38vh;
  }
`;

export default AlertPopUp;
