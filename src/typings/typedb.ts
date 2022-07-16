import { Dispatch, SetStateAction } from "react";

// TK InitialState
export interface Card {
  cardId: number;
  cardName: string;
  description: string;
  manaCost: number;
  target: string;
} // use

export interface DrawCard {
  cardId: number;
}
export interface playersSetting {
  cardsOnHand: Card[];
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
} // use

// #1. 게임 시작
export interface StartModalProps {
  setStatus: Dispatch<SetStateAction<string>>;
}

// header types
export interface HeaderProps {
  status: string;
}

// playerField
export interface PlayerFieldProps {
  sendStompMsgFunc: (
    roomId: string,
    sender: number,
    msgType: string,
    data: object | null
  ) => void;
}

// drawModal
export interface DrawProps {
  sendStompMsgFunc: (
    roomId: string,
    sender: number,
    msgType: string,
    data: object | null
  ) => void;
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
  dead: boolean;
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

export interface CardSelectProps {
  selected: boolean;
  value: Card;
}
export interface CardProps {
  value: Card;
}

export interface DrawableCardsProps {
  value: Card;
  drawDisabled: boolean;
}

export interface DrawableCardSC {
  cardId: number;
  selected: boolean;
}
export interface UseCardProps {
  onMouseOver: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
  value: Card;
  className: string;
}
export interface TargetBtnProps {
  onMouseOver: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface SampleCardProps {
  value: Card;
  className: string;
}
