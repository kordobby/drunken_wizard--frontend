import styled, { keyframes } from "styled-components";
import flex from "../../GlobalStyled/flex";

import table from "../../../images/playerfield/table.png";
import BeerIcon from "../../../images/icons/BeerIcon.png";
import InGameBackground from "../../../images/background/IngameBackground.png";
import matchFlagImg from "./TurnFlag";
import matchClassImg from "./MatchClass";
import matchProfileImg from "./MatchProfile";
import {
  positionProps,
  StatIconsImgProps,
  IconsImgProps,
  DrawableCardSC,
  TargetBtnProps,
  UseCardProps,
  StatProps,
  NameTagProps,
  StatNumberProps,
  NameTagsProps,
  BtnColorType,
  FlagProps,
} from "../../../typings/typedb";
import matchStatusImg from "./StatusIcon";
import matchCardImg from "./CardFactory";

/* Common */
export const StGameWrap = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  /* padding-top: 6.25vw; */
  background-image: url(${InGameBackground});
  z-index: -10;
  ${flex({ direction: "column", align: "center" })};
`;

/* Notice Section */
export const HeaderWrap = styled.div`
  height: 120px;
  background-color: var(--grey);
  font-family: "국립박물관문화재단클래식M";
  width: 100vw;
  /* font-size: 3.33vh; */
  color: white;
  box-sizing: border-box;
  padding-left: 40px;
  ${flex({ justify: "flex-start", align: "center" })};
`;

/* Main Section */
export const MainWrap = styled.div`
  width: 100vw;
  height: 630px;
  box-sizing: border-box;
  ${flex({ align: "center" })}
`;

// Main => PlayerIcons
export const PlayerIconsFields = styled.div`
  width: 1045px;
  height: 630px;
  box-sizing: border-box;
  padding-bottom: 10px;
  ${flex({ justify: "center", align: "flex-end" })}
  position: relative;
`;

export const TeamPosition = styled.div<positionProps>`
  z-index: ${({ layer }) => layer && `${layer}`};
  position: absolute;
  bottom: ${({ top }) => top && `${top}px`};
  left: ${({ left }) => left && `${left}px`};
`;

export const EnemyPosition = styled.div`
  z-index: 1;
  position: absolute;
  background-color: blue;
  bottom: 150px;
  right: 100px;
`;
//ProfileIcons IconsImgProps
export const PlayerIcon = styled.div<IconsImgProps>`
  height: ${({ size }) => size && `${size}px`};
  width: ${({ size }) => size && `${size}px`};
  position: relative;
  .wizard__img {
    height: ${({ size }) => size && `${size}px`};
    width: ${({ size }) => size && `${size}px`};
    filter: ${(props) => props.dead && `grayscale(100%);`};
    -webkit-filter: ${(props) => props.dead && `grayscale(100%)`};
    background-size: cover;
    background-position: center;
    transform: ${({ reverse }) => (reverse ? "scaleX(-1)" : null)};
    background-image: url(${({ job }) => (job ? matchClassImg(job) : null)});
  }
`;

const nowPlaying = keyframes`
  0% {
    transform: translateY(0px);
  } 25% {
    transform: translateY(-8px);
  }
  50%{
    transform: translateY(-12px);
  } 75%{
    transform: translateY(-8px);
  }100%{
    transform: translateY(0px);
  }
`;

export const PlayingFlag = styled.div<FlagProps>`
  animation: ${nowPlaying} 1s ease infinite;
  background-image: url(${(props) => matchFlagImg(props.status)});
  width: 61px;
  height: 97px;
  position: absolute;
  top: ${({ top }) => top && `${top}px`};
  left: ${({ left }) => left && `${left}px`};
  &:nth-child(2) {
    right: 150px;
  }
`;

export const NameTag = styled.div<NameTagsProps>`
  height: 50px;
  width: 154px;
  border-radius: 50px;
  font-size: 24px;
  border: 1px solid var(--white);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  ${flex({ align: "center", justify: "center" })};
  background-color: ${({ dead }) =>
    dead ? `var(--purple-1)` : `var(--brown-1)`};
  position: absolute;
  bottom: ${({ top }) => top && `${top}px`};
  left: ${({ left }) => left && `${left}px`};
  color: white;
`;

export const PlayerPointBox = styled.div`
  box-sizing: border-box;
  padding-top: 2.083vw;
  /* width: 10.833vw; */
  height: 10.416vw;
  ${flex({ direction: "column" })};
`;

export const PlayerPointBar = styled.div<StatProps>`
  font-size: 1.25vw;
  margin-bottom: 1.5625vw;
  .stat__full {
    width: 10.416vw;
    height: 0.833vw;
    border-radius: 0.833vw;
    border: ${(props) =>
      props.stat ? `1px solid var(--orange)` : `1px solid var(--purple-1)`};
    position: relative;
  }
  .stat__now {
    width: ${({ point }) => point && `${point}vw`};
    height: 0.833vw;
    border-radius: 2.77vh;
    background-color: ${(props) =>
      props.stat ? "var(--orange)" : "var(--purple-1)"};
    position: absolute;
  }
`;

// Main => PlayerIcons : 캐릭터 스탯창(직업/체력/마나)
export const StatBarTop = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  padding: 5px 20px;
`;

// Main => PlayerIcons => PlayerStatBar
export const StatBarRow = styled.div`
  width: 396px;
  height: 140px;
  ${flex({ align: "flex-start" })}
  flex-wrap: wrap;
  /* font-size: 6px; */
`;

// Main => PlayerIcons => PlayerStatBar : Icons
export const StatIconBox = styled.div<StatNumberProps>`
  width: ${({ size }) => size && `${size}px`};
  height: ${({ size }) => size && `${size}px`};
  position: relative;
  margin-right: 10px;
  &:first-child {
    margin-left: 20px;
  }
  &:nth-child(4) {
    margin-right: 100px;
  }
  &:nth-child(5) {
    margin-left: 20px;
  }
`;

export const MyStatIcon = styled.div`
  width: 5.5208vw;
  height: 5.5208vw;
  position: relative;
  margin-right: 0.5208vw;
  &:first-child {
    margin-left: 0.78125vw;
  }
`;

export const StatIcon = styled.div<StatIconsImgProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ size }) => size && `${size}px`};
  height: ${({ size }) => size && `${size}px`};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  background-image: url(${(props) => matchStatusImg(props.stat)});
  background-size: cover;
  border-radius: 1.0416vw;
`;

export const StatCnt = styled.div<StatNumberProps>`
  position: absolute;
  right: 0;
  top: 0;
  width: ${({ size }) => size && `${size}px`};
  height: ${({ size }) => size && `${size}px`};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 1.666vw;
  background-color: var(--purple-3);
  ${flex({ justify: "center", align: "center" })}
  font-size : 6px;
`;

// Main => Crave Field
export const CraveWrap = styled.div`
  ${flex({ direction: "column" })};
  height: 29.166vw;
  box-sizing: border-box;
  position: relative;
`;

export const Crave = styled.div`
  margin-bottom: 1.5625vw;
  height: 22.708vw;
  width: 22.916vw;
  background-color: var(--white);
  opacity: 80%;
  border-radius: 10px;
`;

export const CraveCards = styled.div`
  width: 11.458vw;
  height: 16.666vw;
  border-radius: 1.66vw;
  top: 1.8229vw;
  left: 3.645vw;
  position: absolute;
  background-color: var(--brown-2);
  border: 1px solid var(--white);
  box-shadow: 0.208vw 0.208vw 1.041vw rgba(0, 0, 0, 0.25);
  &:nth-child(2) {
    top: 2.604vw;
    left: 7.031vw;
    transform: rotate(10deg);
    z-index: 1;
  }
`;
/* PlayerField */
export const PlayerFieldWrap = styled.div`
  height: 330px;
  width: 100vw;
  box-sizing: border-box;
  background-color: var(--brown-3);
  ${flex({ align: "flex-start" })};
  z-index: 0;
`;

// PlayerField => [LEFT] PlayerIcon
export const ProfileSizing = styled.div`
  background-color: green;
  width: 800px;
  height: 330px;
  box-sizing: border-box;
  margin-left: 1.5625vw;
  ${flex({ direction: "column", justify: "flex-start", align: "flex-start" })};
  position: relative;
  .profile__img {
    position: relative;
    margin-top: 0.5208vw;
  }
`;

export const StatusSizing = styled.div`
  width: 40.885vw;
  height: 6.51vw;
  box-sizing: border-box;
  margin-top: 0.5208vw;
  padding-top: 0.26041vw;
  ${flex({ justify: "flex-start", align: "flex-start" })};
`;

export const ProfileStatBox = styled.div`
  ${flex({ align: "flex-start" })};
`;
// PlayerField => [LEFT] PlayerIcon : images
export const ProfileIcon = styled.div<IconsImgProps>`
  height: 9.895vw;
  width: 9.895vw;
  border-radius: 24.07vh;
  background-image: url(${(props) => matchProfileImg(props.job)});
  background-size: cover;
  z-index: 5;
`;

export const MyStatBox = styled.div`
  position: absolute;
  top: 1.822vw;
  right: 0;
  z-index: -2;
  width: 32.8125vw;
  height: 7.2916vw;
  box-sizing: border-box;
  padding-left: 2.604vw;
  font-size: 1.875vw;
  font-family: "국립박물관문화재단클래식M";
  background-color: var(--white);
  border-top-right-radius: 1.48vw;
  border-bottom-right-radius: 1.48vw;
  ${flex({ direction: "column", justify: "center", align: "flex-start" })};

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
  top: -0.62vw;
  left: -0.62vw;
  z-index: -1;
`;

// PlayerField => [CENTER] Cards
export const CardsArea = styled.div`
  ${flex({ align: "center" })};
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
  height: 330px;
  width: 910px;
  box-sizing: border-box;
  background-color: blue;
  /* .divider {
    width: 5px;
    height: 224px;
    background-color: black;
  } */
`;

export const Divider = styled.div`
  width: 3px;
  height: 280px;
  border-radius: 3px;
  background-color: var(--brown-1);
`;
export const PlayerCards = styled.div<UseCardProps>`
  height: 224px;
  width: 140px;
  margin: 0 10px;
  background-size: cover;
  font-size: 15px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: white;
  ${flex({ direction: "column", justify: "center", align: "center" })}
  .active {
    background: yellow;
  }

  .normal {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    transform: scale(0.8);
    background: var(--grey);
  }
  .default {
    background: white;
  }
  transition: all 100ms ease-in-out;
`;

export const PlayerCtrlWrap = styled.div`
  background-color: #8aa2a2;
  height: 330px;
  width: 185px;
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

export const TargetBtnBox = styled.div`
  width: 120px;
  height: 120px;
  ${flex({ justify: "space-between", align: "space-between" })};
  flex-wrap: wrap;
  background-color: green;
  margin-bottom: 10px;
`;

export const TargetBtn = styled.button<TargetBtnProps>`
  width: 55.71px;
  height: 55.71px;
  border-radius: 50px;
  border: 1px solid black;
  background-color: var(--white);
  &:hover {
    background-color: var(--orange);
    border: 1px solid white;
  }
`;
export const TargetNullBtn = styled.button<BtnColorType>`
  width: 130px;
  height: 50px;
  border: ${(props) =>
    props.color === "ENEMY"
      ? `1px solid var(--brown-1)`
      : `1px solid var(--purple-1)`};
  /* border: 1px solid red; */
  border-radius: 50px;
  background-color: var(--white);
  color: ${(props) =>
    props.color === "ENEMY" ? `var(--brown-1)` : `var(--purple-1)`};
  margin-bottom: 10px;
  &:hover {
    color: white;
    background-color: ${(props) =>
      props.color === "ENEMY" ? `var(--brown-1)` : `var(--purple-1)`};
  }
`;

export const DisCardBrn = styled.button`
  width: 130px;
  height: 50px;
  border: 1px solid red;
  border-radius: 50px;
  background-color: var(--white);
`;

export const TurnTap = styled.div`
  width: 140px;
  height: 158px;
  ${flex({ direction: "column", align: "center", justify: "center" })};
  color: white;
  font-size: 18px;
  background-color: var(--brown-2);
  border-radius: 10px;
  .turn__button--box {
    margin-top: 10px;
    width: 94px;
    height: 94px;
    ${flex({ justify: "space-between", align: "center" })};
    flex-wrap: wrap;
  }
`;

export const SendHealBtn = styled.button`
  width: 136px;
  height: 50px;
  border-radius: 50px;
  color: ${(props) => (props.disabled ? "var(--white)" : "var(--purple-1)")};
  background-color: ${(props) =>
    props.disabled ? "var(--grey)" : "var(--white)"};
  border: ${(props) => !props.disabled && `1px solid var(--purple-1)`};
  margin-top: 13px;
  font-size: 24px;
`;

export const TurnHealBtn = styled.button<NameTagProps>`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  background-color: ${({ dead }) =>
    dead ? `var(--purple-1)` : `var(--brown-1)`};
  color: white;
`;

// 시작페이지 modal-bg
export const StModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--beige);
  ${flex({ direction: "column", justify: "center", align: "center" })}
`;

/* Footer - PlayerField :: left to right*/

export const DrawModalHeader = styled.div`
  margin-top: 45px;
  margin-bottom: 35px;
  ${flex({ justify: "center", align: "center" })};
  span {
    margin-left: 20px;
    color: var(--purple-1);
    font-size: 36px;
  }
`;
export const NoticeIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: var(--purple-1);
  border-radius: 60px;
  font-size: 36px;
  ${flex({ justify: "center", align: "center" })};
  color: white;
`;

export const DrawModalWrap = styled.div`
  width: 1300px;
  height: 600px;
  background: var(--white);
  border: 1ps solid var(--purple-1);
  border-radius: 32px;
  box-sizing: border-box;
  ${flex({ direction: "column", align: "center" })};
`;

export const DrawableCardsWrap = styled.div`
  ${flex({ align: "center", justify: "center" })};
  width: 1300px;
  height: 330px;
`;

export const DrawableCard = styled.div<DrawableCardSC>`
  width: 180px;
  height: 320px;
  border-radius: 10px;
  border: ${(props) => props.selected && `6px solid var(--yellow)`};
  background-image: url(${(props) => matchCardImg(props.cardName)});
  background-size: cover;
  ${flex({ direction: "column", justify: "center" })};
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

export const PurpleConfirmBtn = styled.div`
  width: 180px;
  height: 60px;
  border-radius: 60px;
  margin-top: 30px;
  ${flex({ direction: "column", justify: "center" })};
  color: white;
  font-size: 36px;
  background-color: var(--purple-1);
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
  font-family: "국립박물관문화재단클래식M";
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

export const TableImg = styled.img.attrs({
  src: `${table}`,
})`
  width: 597px;
  height: 293px;
  z-index: 3;
`;
