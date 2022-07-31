import { Dispatch, MouseEvent, SetStateAction } from "react";

export interface HeaderBtnProps {
  text: string;
  clickFunc?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface HeaderTitleProps {
  text: string;
}

export interface NoticeProps {
  setRoomOutModal: Dispatch<SetStateAction<boolean>>;
}

export interface OneBtnModalProps {
  headerText: string;
  upperText: string;
  lowerText: string;
  confirmText: string;
  clickFunc: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

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

// export interface playerUpdate {
//   object<playersSetting>;
// };
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
  status: string;
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
  ClearTimer: () => void;
}
export interface IconsImgProps {
  job: string;
  dead: boolean;
  reverse: boolean;
  size: number;
}

export interface positionProps {
  layer: number;
  top: number;
  left: number;
}

export interface NameTagsProps {
  dead: boolean;
  top: number;
  left: number;
  team: boolean;
}
export interface NameTagProps {
  dead: boolean;
}

export interface FlagProps {
  status: string;
  top: number;
  left: number;
}
export interface TeamColorProps {
  team: boolean;
  dead: boolean;
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
  size: number;
  mouseOver: boolean;
  value: number;
}

export interface CardBg {
  team: boolean;
  playing: boolean;
}

export interface DrawableCardsProps {
  value: Card;
  drawDisabled: boolean;
}

export interface CraveCardsProps {
  value: Card;
}
export interface DrawableCardSC {
  cardName: string;
  selected: boolean;
}
export interface UseCardProps {
  onMouseOver: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
  value: Card;
  className: string;
}
export interface TargetBtnProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  team: boolean;
  value: number;
}

export interface HealBtnProps {
  onMouseOver: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  team: boolean;
  value: number;
}
export interface TurnOrderProps {
  team: boolean;
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

export interface StatNumberProps {
  size: number;
}
export interface LogoProps {
  top: number;
  bottom: number;
}

export interface DupCheckProps {
  dup: boolean;
}

export interface TwoBtnProps {
  confirmText: string;
  cancelText: string;
  titleText: string;
  upperText: string;
  lowerText: string;
  confirmFunc: () => void;
  cancelFunc: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface IngameAlertProps {
  upperText: string;
  middleText: string;
  bottomText: string;
}
export interface Targeting {
  targeting: boolean;
  dead: boolean;
}

export interface BtnColorType {
  color: string;
}

export interface TeamProps {
  team: boolean;
}

export interface pageProps {
  page: boolean;
}

export interface OverModalProps {
  status: string;
  clickFunc: () => void;
}
