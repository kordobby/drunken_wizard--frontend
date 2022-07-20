import styled from "styled-components";
import flex from "../GlobalStyled/flex";

import BeerIcon from "../../images/icons/BeerIcon.png";
import InGameBackground from "../../images/background/IngameBackground.png";
import BtnActive from "../../images/buttons/BTN_active.png";
import BtnInActive from "../../images/buttons/BTN_inActive.png";
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
  BtnSettings,
  StatProps,
} from "../../typings/typedb";
import matchStatusImg from "./StatusIcon";
import matchCardImg from "./CardFactory";

/* Common */
export const StGameWrap = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 6.25vw;
  background-image: url(${InGameBackground});
  z-index: -10;
  ${flex({ direction: "column", align: "center" })};
`;

/* Notice Section */
export const HeaderWrap = styled.div`
  height: 6.25vw;
  background-color: var(--grey);
  font-family: "국립박물관문화재단클래식M";
  position: fixed;
  top: 0;
  width: 100vw;
  font-size: 3.33vh;
  color: white;
  ${flex({ justify: "center", align: "center" })};
`;

/* Main Section */
export const MainWrap = styled.div`
  width: 100vw;
  height: calc(100vw - 6.25vw);
  box-sizing: border-box;
  ${flex({ justify: "center", align: "center" })}
`;

// Main => PlayerIcons
export const PlayerIconsFields = styled.div`
  ${flex({ justify: "space-around", align: "center" })}
`;

export const Profiles = styled.div<CardBg>`
  width: 16.66vw; // 320px;
  height: 23.9583vw; // 460px;
  border-radius: 2.96vw; // 32px;
  box-sizing: border-box;
  margin-right: 1.56vw;
  font-family: "국립박물관문화재단클래식M";
  /* border: ${(props) => (props.playing ? `5px solid yellow` : "none")}; */
  background-color: ${(props) =>
    props.team ? "var(--purple-3)" : "var(--brown-3)"};
  ${flex({ direction: "column", align: "center", justify: "flex-start" })};
  .profiles__header {
    font-size: 1.875vw;
    box-sizing: border-box;
    width: 16.66vw;
    height: 4.166vw;
    border-top-left-radius: 2.96vw;
    border-top-right-radius: 2.96vw;
    color: white;
    ${flex({ align: "center", justify: "center" })};
    background-color: ${(props) =>
      props.team ? "var(--purple-1)" : "var(--brown-1)"};
  }
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
  border-radius: 0.52vh;
  background-color: white;
  ${flex({ justify: "center", align: "center" })}
  font-size : 6px;
`;

// Main => Crave Field
export const CraveWrap = styled.div`
  height: 29.6875vw; //570px;
  width: 22.91vw; // 440px;
  background-color: var(--white);
  opacity: 100%;
  border-radius: 10px;
  position: relative;
  .crave__under {
    width: 14.11vw;
    height: 20.26vw;
    border-radius: 1.66vw;
    opacity: 100%;
    top: 4.53125vw;
    left: 3.28vw;
    position: absolute;
    background-color: var(--brown-1);
    border: 1px solid var(--white);
  }
  .crave__top {
    width: 14.11vw;
    height: 20.26vw;
    border-radius: 1.66vw;
    background-color: var(--purple-2);
    position: absolute;
    opacity: 100%;
    top: 5.833vw;
    left: 6.14vw;
    transform: rotate(10deg);
    z-index: 1;
    border: 1px solid var(--white);
  }
`;

/* PlayerField */
export const PlayerFieldWrap = styled.div`
  height: 30.5vh;
  width: 100vw;
  box-sizing: border-box;
  padding-left: 1.04vw;
  background-color: var(--brown-3);
  ${flex({ justify: "space-between", align: "center" })};
  z-index: 0;
`;

// PlayerField => [LEFT] PlayerIcon
export const ProfileSizing = styled.div`
  width: 41.4vw;
  height: 24.074vh;
  ${flex({ direction: "column", justify: "center", align: "flex-start" })};
  position: relative;
  .profile__img {
    width: 14.06vw;
    height: 25vh;
    position: relative;
  }
`;

// PlayerField => [LEFT] PlayerIcon : images
export const ProfileIcon = styled.div<IconsImgProps>`
  height: 13.54vw;
  width: 13.54vw;
  border-radius: 24.07vh;
  background-image: url(${(props) => matchClassImg(props.job)});
  background-size: cover;
  z-index: 5;
`;

export const MyStatBox = styled.div`
  z-index: -2;
  width: 32.8125vw;
  height: 12.96vh;
  box-sizing: border-box;
  padding-left: 5.729vw;
  font-size: 3.33vh;
  font-family: "국립박물관문화재단클래식M";
  background-color: var(--white);
  position: absolute;
  border-top-right-radius: 1.48vw;
  border-bottom-right-radius: 1.48vw;
  ${flex({ direction: "column", justify: "center", align: "flex-start" })};
  left: 15.035vh;
  top: 0.462vh;

  .profile__stats {
    height: 5.277vh;
    ${flex({ justify: "center", align: "center" })};
    .profile__title {
      margin-top: 0.462vh;
    }
  }
`;
export const MyStatBar = styled.div<StatProps>`
  .stat__full {
    width: 21.35vw;
    height: 2.77vh;
    border-radius: 2.77vh;
    margin-left: 1.0416vw;
    border: ${(props) =>
      props.stat ? `1px solid var(--orange)` : `1px solid var(--purple-1)`};
    position: relative;
  }
  .stat__now {
    width: ${({ point }) => point && `${point}vw`};
    height: 2.77vh;
    border-radius: 2.77vh;
    background-color: ${(props) =>
      props.stat ? "var(--orange)" : "var(--purple-1)"};
    position: absolute;
  }
`;

// PlayerField => [LEFT] Timer(back)
export const TimerWrap = styled.div`
  position: absolute;
  top: -1.2vh;
  left: -0.7vw;
  z-index: -1;
`;

// PlayerField => [CENTER] Cards
export const CardsArea = styled.div`
  height: calc(100vh - 70vh);
  width: calc(100vw - 20vw);
  ${flex({ justify: "space-around", align: "center" })};
  .active {
  }

  .normal {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    transform: scale(0.8);
  }
  .default {
    /* background: yellow; */
  }
  transition: all 100ms ease-in-out;
`;

export const PlayerCards = styled.div<UseCardProps>`
  height: 220px;
  width: 160px;
  margin: 0 10px;
  background-size: cover;
  font-size: 15px;
  box-sizing: border-box;
  padding-bottom: 30px;
  background-image: url(${(props) => matchCardImg(props.value.cardId)});
  ${flex({ direction: "column", justify: "flex-end", align: "center" })}
`;

export const PlayerCtrlWrap = styled.div`
  position: relative;
  background-color: #8aa2a2;
  height: calc(100vh - 70vh);
  width: 50px;
  ${flex({ direction: "column", justify: "center", align: "center" })}
`;

export const TurnOverBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: green;
  right: 10px;
  bottom: 10px;
  position: absolute;
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
  border: ${(props) => props.selected && "red"};
  background-image: url(${(props) => matchCardImg(props.cardId)});
  background-color: ${(props) => (props.selected ? "blue" : "yellow")};
  ${flex({ direction: "column", justify: "center" })};
  margin-right: 20px;
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

export const IngameBtn = styled.div<BtnSettings>`
  width: 17.18vw; // 330px;
  height: 5.2083vw; // 100px;
  background-size: cover;
  font-size: 1.875vw;
  color: var(--white);
  ${flex({ justify: "center", align: "center" })};
  background-image: url(${(props) =>
    props.disabled ? BtnInActive : BtnActive});
`;

export const BeerIcons = styled.div`
  width: 11.271vw;
  height: 15.59vw;
  background-size: cover;
  background-image: url(${BeerIcon});
  margin-top: 9.375vw;
  margin-bottom: 3.6458vw;
`;

export const StartDiv = styled.div`
  width: 46.875vw;
  height: 16.09375vw;
  background-color: var(--brown-3);
  border-radius: 32px;
  ${flex({ direction: "column", justify: "center", align: "center" })};
  .start__notice {
    color: var(--brown-1);
    font-size: 1.875vw;
    margin-bottom: 0.78125vw;
  }
  .start__notice--btm {
    margin-bottom: 1.5625vw;
  }
`;
