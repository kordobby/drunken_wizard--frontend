import styled, { keyframes } from "styled-components";
import flex from "../../GlobalStyled/flex";

import table from "../../../images/playerfield/table.png";
import BeerIcon from "../../../images/icons/BeerIcon.png";
import lobbyBack from "../../../images/background/lobbybackground.png";
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
  TurnOrderProps,
  CraveCardsProps,
  StatNumberProps,
  NameTagsProps,
  BtnColorType,
  FlagProps,
  HealBtnProps,
} from "../../../typings/typedb";
import matchStatusImg from "./StatusIcon";
import matchCardImg from "./CardFactory";

/* Common */
export const StGameWrap = styled.div`
  width: 100vw;
  z-index: -10;
  background-image: url(${lobbyBack});
  background-size: cover;
  background-repeat: no-repeat;
  ${flex({ direction: "column", align: "center" })};
`;

export const StGameWrapFilter = styled.div`
  width: 100vw;
  height: 87.03vh;
  z-index: 1;
  ${flex({ direction: "column", align: "center" })};
`;

/* Notice Section */
export const HeaderWrap = styled.div`
  width: 100vw;
  min-width: 70vw;
  height: 6.25vw;
  background-color: var(--grey);
  font-family: "국립박물관문화재단클래식M";
  /* font-size: 3.33vh; */
  color: white;
  box-sizing: border-box;
  padding-left: 2.083vw;
  ${flex({ justify: "flex-start", align: "center" })};
`;

/* Main Section */
export const MainWrap = styled.div`
  width: 100vw;
  height: 32.8125vw;
  box-sizing: border-box;
  ${flex({ align: "center" })}
`;

// Main => PlayerIcons
export const PlayerIconsFields = styled.div`
  width: 54.427vw;
  height: 32.8125vw;
  box-sizing: border-box;
  padding-bottom: 0.5208vw;
  ${flex({ justify: "center", align: "flex-end" })}
  position: relative;
`;

export const TeamPosition = styled.div<positionProps>`
  z-index: ${({ layer }) => layer && `${layer}`};
  position: absolute;
  bottom: ${({ top }) => top && `${top}vw`};
  left: ${({ left }) => left && `${left}vw`};
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
  height: ${({ size }) => size && `${size}vw`};
  width: ${({ size }) => size && `${size}vw`};
  position: relative;
  .wizard__img {
    height: ${({ size }) => size && `${size}vw`};
    width: ${({ size }) => size && `${size}vw`};
    filter: ${(props) => props.dead && `brightness(0%)`};
    -webkit-filter: ${(props) => props.dead && `brightness(0%)`};
    background-size: cover;
    background-position: center;
    transform: ${({ reverse }) => (reverse ? "scaleX(-1)" : null)};
    background-image: url(${({ job }) => (job ? matchClassImg(job) : null)});
  }
`;

const nowPlaying = keyframes`
  0% {
    transform: translateY(0x);
  } 25% {
    transform: translateY(-0.416vw);
  }
  50%{
    transform: translateY(-0.625vw);
  } 75%{
    transform: translateY(-0.416vw);
  }100%{
    transform: translateY(0);
  }
`;

export const PlayingFlag = styled.div<FlagProps>`
  animation: ${nowPlaying} 1s ease infinite;
  background-image: url(${(props) => matchFlagImg(props.status)});
  background-size: cover;
  width: 3.177vw;
  height: 5.05vw;
  position: absolute;
  top: ${({ top }) => top && `${top}vw`};
  left: ${({ left }) => left && `${left}vw`};
  &:nth-child(2) {
    right: 7.8125vw;
  }
`;

export const NameTag = styled.div<NameTagsProps>`
  height: 2.604vw;
  width: 8.02vw;
  border-radius: 2.604vw;
  font-size: 1.25vw;
  border: 1px solid var(--white);
  filter: ${({ dead }) => dead && `grayscale(100%)`};
  color: ${({ dead }) => dead && "var(--grey)"};
  -webkit-filter: ${({ dead }) => dead && `grayscale(100%)`};
  box-shadow: 0.104vw 0.104vw 0.208vw rgba(0, 0, 0, 0.25);
  ${flex({ align: "center", justify: "center" })};
  background-color: ${({ team }) =>
    team ? `var(--purple-1)` : `var(--brown-1)`};
  position: absolute;
  bottom: ${({ top }) => top && `${top}vw`};
  left: ${({ left }) => left && `${left}vw`};
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
  margin-top: 0.833vw;
  padding: 0.26vw 1.0416vw;
`;

// Main => PlayerIcons => PlayerStatBar
export const StatBarRow = styled.div`
  width: 20.625vw;
  height: 7.2916vw;
  ${flex({ align: "flex-start" })}
  flex-wrap: wrap;
  /* font-size: 6px; */
`;

// Main => PlayerIcons => PlayerStatBar : Icons
export const StatIconBox = styled.div<StatNumberProps>`
  width: ${({ size }) => size && `${size}vw`};
  height: ${({ size }) => size && `${size}vw`};
  position: relative;
  margin-right: 0.5208vw;
  &:first-child {
    margin-left: 1.0416vw;
  }
  &:nth-child(4) {
    margin-right: 5.208vw;
  }
  &:nth-child(5) {
    margin-left: 1.0416vw;
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
  width: ${({ size }) => size && `${size}vw`};
  height: ${({ size }) => size && `${size}vw`};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  background-image: url(${(props) => matchStatusImg(props.stat)});
  background-size: cover;
  border-radius: 1.0416vw;
  filter: brightness(150%);
  -webkit-filter: brightness(150%);
`;

export const CoverIcon = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--purple-1);
  border-radius: 1.0416vw;
  color: white;
  ${flex({ justify: "center", align: "center" })}
`;

export const StatCnt = styled.div<StatNumberProps>`
  position: absolute;
  right: 0;
  top: 0;
  width: ${({ size }) => size && `${size}vw`};
  height: ${({ size }) => size && `${size}vw`};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 1.666vw;
  background-color: var(--purple-3);
  ${flex({ justify: "center", align: "center" })}
  font-size : 0.3125vw;
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
  border-radius: 0.5208vw;
`;

const usedCard = keyframes`
  0% {
    transform: translateY(26.0416vw) rotate(-12deg);
  } 100%{
    transform: translateY(0px) rotate(-12deg);
  }
`;

export const CraveCards = styled.div<CraveCardsProps>`
  width: 10.52vw;
  height: 18.697vw;
  border-radius: 0.5208vw;
  top: 1.804vw;
  left: 3.645vw;
  transform: rotate(-12deg);
  z-index: 1;
  position: absolute;
  background-image: url(${(props) => matchCardImg(props.value.cardName)});
  background-size: cover;
  box-shadow: 0.208vw 0.208vw 1.041vw rgba(0, 0, 0, 0.25);
  &:nth-child(2) {
    top: 2.604vw;
    left: 7.031vw;
    transform: rotate(12deg);
    z-index: 1;
  }
  &:nth-child(3) {
    /* animation: ${usedCard} 0.5s ease; */
    top: 1.8229vw;
    left: 9.031vw;
  }
`;
/* PlayerField */
export const PlayerFieldWrap = styled.div`
  /* height: 30.55vh; */
  height: 17.1875vw;
  width: 100vw;
  box-sizing: border-box;
  background-color: var(--brown-3);
  ${flex({ align: "flex-start" })};
  z-index: 0;
`;

// PlayerField => [LEFT] PlayerIcon
export const ProfileSizing = styled.div`
  width: 41.66vw;
  height: 17.1875vw;
  box-sizing: border-box;
  margin-left: 0.78125vw;
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
  border-radius: 9.895vw;
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
    height: 1.5625vw;
    border-radius: 1.5625vw;
    margin-left: 1.0416vw;
    border: ${(props) =>
      props.stat ? `1px solid var(--orange)` : `1px solid var(--purple-1)`};
    position: relative;
  }
  .stat__now {
    width: ${({ point }) => point && `${point}vw`};
    height: 1.5625vw;
    border-radius: 1.5625vw;
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
  ${flex({ justify: "flex-start", align: "center" })};
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
  box-sizing: border-box;
  height: 17.1875vw;
  width: 47.916vw;
`;

export const ActionFailText = styled.div`
  height: 17.1875vw;
  width: 32.2916vw;
  font-size: 1.25vw;
  ${flex({ justify: "center", align: "center" })};
`;

export const Divider = styled.div`
  width: 0.15625vw;
  height: 14.583vw;
  border-radius: 0.15625vw;
  background-color: var(--brown-1);
  margin-left: 0.52083vw;
`;

export const PlayerCards = styled.div<UseCardProps>`
  height: 11.666vw;
  width: 7.2916vw;
  margin: 0 0.5208vw;
  background-size: cover;
  font-size: 0.78125vw;
  border-radius: 0.833vw;
  box-sizing: border-box;
  background-image: url(${(props) => matchCardImg(props.value.cardName)});
  ${flex({ direction: "column", justify: "center", align: "center" })};
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
  height: 17.1875vw;
  width: 9.6354vw;
  ${flex({ direction: "column", justify: "center", align: "center" })}
`;

export const TurnOverBtn = styled.button`
  width: 2.604vw;
  height: 2.604vw;
  border-radius: 2.604vw;
  right: 0.5208vw;
  bottom: 0.5208vw;
  position: absolute;
`;

export const TargetBtnBox = styled.div`
  width: 6.25vw;
  height: 6.25vw;
  ${flex({ justify: "space-between", align: "space-between" })};
  flex-wrap: wrap;
  margin-bottom: 0.5208vw;
`;

export const TargetBtn = styled.button<TargetBtnProps>`
  width: 2.901vw;
  height: 2.901vw;
  border-radius: 2.6041vw;
  border: ${({ team }) =>
    team ? `1px solid var(--purple-1)` : `1px solid var(--brown-1)`};
  color: ${({ team }) => (team ? `var(--purple-1)` : `var(--brown-1)`)};
  background-color: var(--white);
  &:hover {
    background-color: ${({ team }) =>
      team ? `var(--purple-1)` : `var(--brown-1)`};
    border: 1px solid white;
    color: white;
  }
`;
export const TargetNullBtn = styled.button<BtnColorType>`
  width: 6.7708vw;
  height: 2.6041vw;
  border: ${(props) =>
    props.color === "ENEMY"
      ? `1px solid var(--brown-1)`
      : `1px solid var(--purple-1)`};
  /* border: 1px solid red; */
  border-radius: 2.6041vw;
  background-color: var(--white);
  color: ${(props) =>
    props.color === "ENEMY" ? `var(--brown-1)` : `var(--purple-1)`};
  margin-bottom: 0.5208vw;
  &:hover {
    color: white;
    background-color: ${(props) =>
      props.color === "ENEMY" ? `var(--brown-1)` : `var(--purple-1)`};
  }
`;

export const DisCardBrn = styled.button`
  width: 6.7708vw;
  height: 2.604vw;
  border: 1px solid #ce0000;
  border-radius: 2.604vw;
  color: #ce0000;
  background-color: var(--white);
  &:hover {
    color: white;
    background-color: #ce0000;
  }
`;

export const TurnTap = styled.div`
  width: 7.2916vw;
  height: 8.2291vw;
  ${flex({ direction: "column", align: "center", justify: "center" })};
  color: white;
  font-size: 0.9375vw;
  background-color: var(--brown-2);
  border-radius: 0.5208vw;
  .turn__button--box {
    margin-top: 0.5208vw;
    width: 4.895vw;
    height: 4.895vw;
    ${flex({ justify: "space-between", align: "center" })};
    flex-wrap: wrap;
  }
`;

export const SendHealBtn = styled.button`
  width: 7.083vw;
  height: 2.604vw;
  border-radius: 2.604vw;
  color: ${(props) => (props.disabled ? "var(--white)" : "var(--purple-1)")};
  background-color: ${(props) =>
    props.disabled ? "var(--grey)" : "var(--white)"};
  border: ${(props) => !props.disabled && `1px solid var(--purple-1)`};
  margin-top: 0.677vw;
  font-size: 1.25vw;
`;

export const TurnHealBtn = styled.button<HealBtnProps>`
  width: 2.1875vw;
  height: 2.1875vw;
  border-radius: 2.1875vw;
  background-color: ${({ team }) =>
    team ? `var(--purple-1)` : `var(--brown-1)`};
  color: white;
`;

export const TurnBtn = styled.div<TurnOrderProps>`
  width: 2.1875vw;
  height: 2.1875vw;
  border-radius: 2.1875vw;
  background-color: ${({ team }) =>
    team ? `var(--purple-1)` : `var(--brown-1)`};
  color: white;
  ${flex({ justify: "center", align: "center" })}
`;
export const TurnOrderBtn = styled.button<TurnOrderProps>`
  width: 2.1875vw;
  height: 2.1875vw;
  border-radius: 2.1875vw;
  background-color: ${({ team }) =>
    team ? `var(--purple-1)` : `var(--brown-1)`};
  color: white;
  ${flex({ justify: "center", align: "center" })}
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
  margin-top: 2.34375vw;
  margin-bottom: 1.822vw;
  ${flex({ justify: "center", align: "center" })};
  span {
    margin-left: 1.0416vw;
    color: var(--purple-1);
    font-size: 1.875vw;
  }
`;
export const NoticeIcon = styled.div`
  width: 3.125vw;
  height: 3.125vw;
  background-color: var(--purple-1);
  border-radius: 3.125vw;
  font-size: 1.875vw;
  ${flex({ justify: "center", align: "center" })};
  color: white;
`;

export const DrawModalWrap = styled.div`
  width: 67.708vw;
  height: 31.25vw;
  background: var(--white);
  border: 1ps solid var(--purple-1);
  border-radius: 1.666vw;
  box-sizing: border-box;
  ${flex({ direction: "column", align: "center" })};
`;

export const DrawableCardsWrap = styled.div`
  ${flex({ align: "center", justify: "center" })};
  width: 67.708vw;
  height: 17.1875vw;
`;

export const DrawableCard = styled.div<DrawableCardSC>`
  width: 9.375vw;
  height: 16.666vw;
  border-radius: 0.5208vw;
  border: ${(props) => props.selected && `0.3125vw solid var(--yellow)`};
  background-image: url(${(props) => matchCardImg(props.cardName)});
  background-size: cover;
  ${flex({ direction: "column", justify: "center" })};
  margin-right: 1.0416vw;
  &:last-child {
    margin-right: 0;
  }
`;

export const PurpleConfirmBtn = styled.button`
  width: 9.375vw;
  height: 3.125vw;
  border-radius: 3.125vw;
  margin-top: 1.5625vw;
  ${flex({ direction: "column", justify: "center" })};
  color: white;
  font-size: 1.875vw;
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
  width: 31.09vw;
  height: 15.26vw;
  z-index: 3;
`;
