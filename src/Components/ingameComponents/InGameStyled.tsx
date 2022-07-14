import styled from "styled-components";
import flex from "../GlobalStyled/flex";

import healer from "../../Public/Images/healer.png";
import dealer from "../../Public/Images/dealer.png";
import ghost from "../../Public/Images/ghost.png";
import wizard from "../../Public/Images/wizard.png";
import what from "../../Public/Images/what.png";
import blood from "../../Public/Images/blood.png";
import {
  StatIconsImgProps,
  IconsImgProps,
  CardBg,
  DrawableCardSC,
  TargetBtnProps,
  UseCardProps,
} from "../../typings/typedb";
import matchStatusImg from "./StatusIcon";

/* Common */
export const StGameWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--brown);
`;

/* Notice Section */
export const HeaderWrap = styled.div`
  height: calc(100vh - 90vh);
  background-color: #9c71e1;
  ${flex({ justify: "center", align: "center" })};
`;

/* Main Section */
export const MainWrap = styled.div`
  width: 100vw;
  height: calc(100vh - 40vh);
  ${flex({ justify: "flex-start", align: "center" })}
`;

// Main => PlayerIcons
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

// Main => PlayerIcons : 캐릭터 직업 이미지
export const ProfilesImage = styled.div<IconsImgProps>`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-size: cover;
  filter: ${(props) => props.dead && `grayscale(100%);`};
  -webkit-filter: ${(props) => props.dead && `grayscale(100%) blur(5px)`};
  background-image: url(${(props) => matchClassImg(props.job)});
  ${flex({ justify: "center", align: "center" })}
  position: relative;
`;

export const PlayerNameTag = styled.div`
  height: 30px;
  width: 160px;
  background-color: #ffffff;
  ${flex({ justify: "center", align: "center" })};
  bottom: -10px;
  position: absolute;
`;
// Main => PlayerIcons : 캐릭터 스탯창(직업/체력/마나)
export const StatBarTop = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  padding: 5px 20px;
`;

// Main => PlayerIcons => PlayerStatBar
export const StatBarWrap = styled.div`
  width: 100%;
  display: ${flex({ direction: "column", justify: "center", align: "center" })};
`;

export const StatBarRow = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-left: 14px;
  display: flex;
  flex-wrap: wrap;
`;
// Main => PlayerIcons => PlayerStatBar : Icons
export const StatIconBox = styled.div`
  width: 30px;
  height: 30px;
  ${flex({
    justify: "center",
    align: "center",
  })}
  margin-right: 5px;
  margin-bottom: 5px;
  position: relative;
`;

export const StatIcon = styled.div<StatIconsImgProps>`
  width: 28px;
  height: 28px;
  background-image: url(${(props) => matchStatusImg(props.stat)});
  background-size: cover;
  border-radius: 24px;
`;

export const StatCnt = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  border-radius: 10px;
  background-color: white;
  ${flex({ justify: "center", align: "center" })}
  font-size : 6px;
`;

// Main => Crave Field
export const CraveWrap = styled.div`
  width: 240px;
  height: 300px;
  border-radius: 30px;
  background-color: white;
  ${flex({ direction: "column", justify: "center", align: "center" })};
`;

/* PlayerField */
export const PlayerFieldWrap = styled.div`
  height: calc(100vh - 70vh);
  background-color: #3e2b4c;
  ${flex({ justify: "space-between", align: "center" })};
`;

// PlayerField => [LEFT] PlayerIcon
export const ProfileSizing = styled.div`
  height: 100%;
  width: 250px;
  ${flex({ direction: "column", justify: "center", align: "center" })};
  position: relative;
  margin-top: 10px;
`;

// PlayerField => [LEFT] PlayerIcon : images
export const ProfileIcon = styled.div<IconsImgProps>`
  height: 140px;
  width: 140px;
  border-radius: 70px;
  background-image: url(${(props) => matchClassImg(props.job)});
  background-size: cover;
  z-index: 1;
`;

// PlayerField => [LEFT] Timer(back)
export const TimerWrap = styled.div`
  position: absolute;
  top: -10px;
  z-index: 0;
`;

// PlayerField => [CENTER] Cards
export const CardsArea = styled.div`
  background-color: #ba74ff;
  ${flex({ justify: "center", align: "center" })}
`;

export const PlayerCards = styled.div<UseCardProps>`
  height: 160px;
  width: 120px;
  .active {
    background-color: blue;
  }

  .normal {
    background: red;
    transform: scale(0.8);
  }
  .default {
    background: yellow;
  }
  transition: all 100ms ease-in-out;
`;

export const PlayerCtrlWrap = styled.div`
  background-color: #8aa2a2;
  width: 300px;
  height: 200px;
  ${flex({ direction: "column", justify: "center", align: "center" })}
`;

export const TurnOverBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 50px;
  background-color: var(--orange);
`;

export const TargetBtn = styled.button<TargetBtnProps>`
  width: 100px;
  height: 50px;
  border-radius: 50px;
  background-color: var(--orange);
`;
export const TargetNullBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 50px;
  background-color: var(--orange);
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

export const DrawableCard = styled.div<DrawableCardSC>`
  width: 100px;
  height: 150px;
  /* background-color: ${(props) => (props.selected ? "blue" : "yellow")}; */
  ${flex({ direction: "column", justify: "center" })};
  margin-right: 20px;
`;

// main field
// player icons

// export const PlayerNameTag = styled.div`
//   width: 80px;
//   height: 30px;
//   ${flex({ justify: "center", align: "center" })}
// `;

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
      return blood;
      return;
  }
}
