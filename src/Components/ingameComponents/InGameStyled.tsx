import styled from "styled-components";
import flex from "../GlobalStyled/flex";

import healer from "../../Public/Images/healer.png";
import dealer from "../../Public/Images/dealer.png";
import ghost from "../../Public/Images/ghost.png";
import wizard from "../../Public/Images/wizard.png";
import what from "../../Public/Images/what.png";
import blood from "../../Public/Images/blood.png";
import { IconsImgProps, CardBg, DrawCards } from "../../typings/typedb";

/* Common */

export const StGameWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--brown);
  ${flex({ direction: "column", justify: "space-between", align: "center" })};
`;

export const TargetBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 50px;
  background-color: var(--orange);
`;

export const ScCardsWrap = styled.div`
  width: 100px;
  height: 100%;
  background-color: #ffc080;
  ${flex({ direction: "column", justify: "center" })};
  margin: 0 10px;
`;

// 시작페이지 modal-bg
export const StModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--beige);
  ${flex({ direction: "column", justify: "center", align: "center" })}
  z-index: 5;
  position: fixed;
`;

/* Footer - PlayerField :: left to right*/

export const PlayerFieldWrap = styled.div`
  width: 100vw;
  height: 200px;
  bottom: 0;
  background-color: #3e2b4c;
  ${flex({ justify: "space-between", align: "center" })}
`;

// left
export const ProfileSizing = styled.div`
  width: 200px;
  height: 200px;
  ${flex({ direction: "column", justify: "center", align: "center" })}
  position : relative
`;

export const ProfileIcon = styled.div<IconsImgProps>`
  width: 120px;
  height: 120px;
  background-image: url(${(props) => matchClassImg(props.job)});
  background-size: cover;
  border-radius: 75px;
  z-index: 1;
`;

export const CardsArea = styled.div`
  background-color: #ba74ff;
  ${flex({ justify: "center", align: "center" })}
`;

export const PlayerCtrlWrap = styled.div`
  background-color: #8aa2a2;
  width: 300px;
  height: 200px;
  ${flex({ direction: "column", justify: "center", align: "center" })}
`;

export const DrawModalWrap = styled.div`
  width: 100vw;
  height: 400px;
  position: fixed;
  border-radius: 30px;
  top: 30%;
  ${flex({ direction: "column", align: "center", justify: "center" })};
  background-color: #ffffff;
`;

export const DrawableCardsWrap = styled.div`
  width: 100%;
  height: 100%;
  ${flex({ align: "center", justify: "center" })};
`;
export const DrawbleCardWrap = styled.div<DrawCards>`
  width: 100px;
  height: 150px;
  background-color: ${(props) => (props.selected ? "blue" : "yellow")};
  ${flex({ direction: "column", justify: "center" })};
  margin-right: 20px;
`;

// main field
// player icons

export const PlayerIconsFields = styled.div`
  width: 100%;
  height: 300px;
  ${flex({ justify: "space-around", align: "center" })}
`;

export const Profiles = styled.div<CardBg>`
  width: 200px;
  height: 300px;
  border-radius: 30px;
  border: ${(props) => (props.playing ? `5px solid yellow` : "none")};
  background-color: ${(props) =>
    props.team ? "var(--orange)" : "var(--beige)"};
  ${flex({ direction: "column", justify: "center", align: "center" })}
`;

export const CraveWrap = styled.div`
  width: 240px;
  height: 300px;
  border-radius: 30px;
  background-color: white;
  ${flex({ direction: "column", justify: "center", align: "center" })};
`;

export const PlayerNameTag = styled.div`
  width: 80px;
  height: 30px;
  ${flex({ justify: "center", align: "center" })}
`;

/* character class images-matching func*/
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

export const TimerWrap = styled.div`
  position: absolute;
  top: 10px;
  z-index: 0;
`;
