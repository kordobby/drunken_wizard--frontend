import styled from "styled-components";
import flex from "../GlobalStyled/flex";

import healer from "../../Public/Images/healer.png";
import dealer from "../../Public/Images/dealer.png";
import ghost from "../../Public/Images/ghost.png";
import wizard from "../../Public/Images/wizard.png";

export const StWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  z-index: -5;
`;

// 캐릭터 클래스에 따른 Img matching
// default img 추가하기*
export default function matchClassImg(data: string) {
  switch (data) {
    case "healer":
      return healer;
    case "dealer":
      return dealer;
    case "ghost":
      return ghost;
    case "wizard":
      return wizard;
    default:
      return;
  }
}

export const ScCardsWrap = styled.div`
  width: 100px;
  height: 100px;
  background-color: yellow;
  ${flex({ direction: "column", justify: "center" })};
  margin-right: 20px;
`;

export const PlayerFieldWrap = styled.div`
  width: 100vw;
  height: 250px;
  background-color: #3e2b4c;
  ${flex({ justify: "space-around", align: "center" })}
`;

export const CardsArea = styled.div`
  background-color: #ba74ff;
  ${flex({ justify: "center", align: "center" })}
`;

export const PlayerCtrlWrap = styled.div`
  background-color: #8aa2a2;
  width: 300px;
  height: 250px;
  ${flex({ direction: "column", justify: "center", align: "center" })}
`;

export const DrawModalWrap = styled.div`
  width: 100vw;
  height: 400px;
  position: fixed;
  top: 50px;
  ${flex({ justify: "center" })};
  background-color: #81c4ff;
`;

export const DrawbleCardWrap = styled.div`
  width: 100px;
  height: 150px;
  background-color: yellow;
  ${flex({ direction: "column", justify: "center" })};
  margin-right: 20px;
`;
