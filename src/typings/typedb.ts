import { Dispatch, SetStateAction } from "react";

// TK InitialState
export interface Card {
  cardId: number;
  cardName: string;
  description: string;
  manaCost: number;
  target: string;
}

export interface playersSetting {
  cardsOnHand: any;
  charactorClass: string;
  playerId: number;
  health: number;
  username: string;
  dead: boolean;
  mana: number;
  manaCostModifierDuration: number;
  mutedDuration: number;
  petrifiedDuration: number;
  poisonedDuration: number;
  shield: boolean;
  sleepDuration: number;
  stunnedDuration: number;
  team: boolean;
  turnOrder: number;
  weakDuration: number;
  damageModifierDuration: number;
}

// #1. 게임 시작
export interface StartModalProps {
  setStatus: Dispatch<SetStateAction<string>>;
}

// header types
export interface HeaderProps {
  status: string;
}

// playerField
export interface PlayerProps {
  setFindTargetGroup: Dispatch<SetStateAction<string>>;
  findTargetGroup: string;
  selectUseCardHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sendUseCardHandler: () => void;
  selectDisCardHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setSelectTarget: Dispatch<SetStateAction<number>>;
  sendStompMsgFunc: (
    roomId: string,
    sender: number,
    msgType: string,
    data: object | null
  ) => void;
  selectedCardName: string;
}

// cards
export interface CardProps {
  id: number;
  className: string;
  name: string;
  team: boolean;
  selectUseCardHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectDisCardHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// drawModal
export interface DrawProps {
  id: number;
  selectTurnController: () => void;
  selectedCard: any[];
  drawDisabled: boolean;
  setSelectedCard: Dispatch<SetStateAction<object[]>>;
}

// drawableCards
export interface DrawCardsProps {
  id: number;
  target: string;
  drawDisabled: boolean;
  setSelectedCard: Dispatch<SetStateAction<object[]>>;
  selectedCard: any[];
}

export interface PlayerSetProps {
  cardsOnHand: object[];
  charactorClass: string;
  playerId: number;
  health: number;
  username: string;
  dead: boolean;
  mana: number;
  manaCostModifierDuration: number;
  muteDuration: number;
  petrifiedDuration: number;
  poisonedDuration: number;
  shield: boolean;
  sleepDuration: number;
  stunnedDuration: number;
  team: boolean;
  turnOrder: number;
  weakDuration: number;
  damageModifierDuration: number;
}

// playerIcons
export interface IconsImgProps {
  job: string;
}

// cardType
export interface CardType {
  cardId: number;
  cardName: string;
  description: string;
  manaCost: number;
  target: string;
}

export interface StatBarProps {
  manaCostModifierDuration: number;
  mutedDuration: number;
  petrifiedDuration: number;
  poisonedDuration: number;
  shield: boolean;
  sleepDuration: number;
  stunnedDuration: number;
  weakDuration: number;
  damageModifierDuration: number;
}

export interface StatIconsImgProps {
  stat: string;
}

export interface CardBg {
  team: boolean;
  playing: boolean;
}
export interface DrawCards {
  selected: boolean;
}
