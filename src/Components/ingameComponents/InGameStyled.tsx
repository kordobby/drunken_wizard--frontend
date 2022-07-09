import styled from "styled-components";
import flex from "../GlobalStyled/flex";

import healer from "../../Public/Images/healer.png";
import dealer from "../../Public/Images/dealer.png";
import ghost from "../../Public/Images/ghost.png";
import wizard from "../../Public/Images/wizard.png";
import what from "../../Public/Images/what.png";
import blood from "../../Public/Images/blood.png";

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
    case "HEALER":
      return healer;
    case "FARSEER":
      return dealer;
    case "ENCHANTER":
      return ghost;
    case "WAROCK":
      return wizard;
    case "INVOKER":
      return what;
    case "BLOODMAGE":
      return blood;
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

// main field
// player icons

export const PlayerIconsFields = styled.div`
  width: 600px;
  height: 300px;
  background-color: white;
  ${flex({ justify: "center", align: "center" })}
`;
export const Profiles = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 30px;
`;
export const PlayerNameTag = styled.div`
  width: 80px;
  height: 30px;
  background-color: aqua;
  ${flex({ justify: "center", align: "center" })}
`;
