import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import win from "../../../images/playerfield/win.png";
import lose from "../../../images/playerfield/lose.png";
import lobbyBack from "../../../images/background/lobbybackground.webp";
import { DefaultBtnL } from "../../Common/CommonStyle";
import { OverModalProps } from "../../../typings/typedb";

const OverModal = ({ status, clickFunc }: OverModalProps) => {
  return (
    <OverModalWrap>
      <ModalBox>
        {status === "WIN" ? (
          <>
            <WinImage></WinImage>
            <span>술취한 마법사들의 배틀에서 승리하셨군요!</span>
            <span>맥주 한 잔하며 숨 좀 돌리세요!</span>
            <DefaultBtnL onClick={clickFunc} disabled={false}>
              확인
            </DefaultBtnL>
          </>
        ) : (
          <>
            <LoseImage></LoseImage>
            <span>그런 날도 있는거죠.</span>
            <span>맥주 한 잔으로 털어버려요!</span>
            <DefaultBtnL onClick={clickFunc} disabled={false}>
              확인
            </DefaultBtnL>{" "}
          </>
        )}
      </ModalBox>
    </OverModalWrap>
  );
};

const OverModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background-image: url(${lobbyBack});
  background-size: cover;
  background-repeat: no-repeat;
  ${flex({ justify: "center", align: "center" })};
  position: fixed;
`;

const ModalBox = styled.div`
  width: 72.6vw;
  height: 38.54vw;
  background-color: var(--brown-3);
  border-radius: 4vw;
  ${flex({ direction: "column", align: "center", justify: "flex-end" })};
  position: relative;
  font-size: 1.875vw;
  box-sizing: border-box;
  padding-bottom: 1.875vw;
  span {
    margin-bottom: 0.827vw;
  }
`;

const WinImage = styled.img.attrs({
  src: `${win}`,
})`
  width: 37.942vw;
  position: absolute;
  top: -1.834vw;
`;

const LoseImage = styled.img.attrs({
  src: `${lose}`,
})`
  width: 37.942vw;
  position: absolute;
  top: -1.834vw;
`;
export default OverModal;
