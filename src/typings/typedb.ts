import { Dispatch, SetStateAction } from "react";

export interface Card {
  cardId: number;
  cardName: string;
  description: string;
  manaCost: number;
  target: string;
}

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
}
export interface StartModalProps {
  setStatus: Dispatch<SetStateAction<string>>;
}

export interface HeaderProps {
  status: string;
}

export interface PlayerFieldProps {
  sendStompMsgFunc: (
    roomId: string | undefined,
    sender: number,
    msgType: string,
    data: object | null
  ) => void;
}

export interface DrawProps {
  sendStompMsgFunc: (
    roomId: string | undefined,
    sender: number,
    msgType: string,
    data: object | null
  ) => void;
}
export interface IconsImgProps {
  job: string;
  dead: boolean;
  team: boolean;
}

export interface NameTagProps {
  team: boolean;
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

export interface BtnSettings {
  disabled: boolean;
}

export interface StatProps {
  stat: boolean;
  point: number;
}

export interface BtnProps {
  btnType: string;
  size: number;
}

export interface LogoProps {
  top: number;
  bottom: number;
}

export interface DupCheckProps {
  dup: boolean;
}
