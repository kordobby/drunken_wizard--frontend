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
  selectUseCardHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectDisCardHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// drawModal
export interface DrawProps {
  id: number;
  selectCardDrawTurnHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  cancelCardDrawTurnHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  selectTurnController: () => void;
  selectableCard: object[];
  selectedCard: any[];
  drawDisabled: boolean;
  setDrawModalOpen: Dispatch<SetStateAction<boolean>>;
}

// drawableCards
export interface DrawCardsProps {
  id: number;
  target: string;
  selectCardDrawTurnHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  cancelCardDrawTurnHandler: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  drawDisabled: boolean;
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
