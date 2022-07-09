import { Dispatch, SetStateAction } from "react";

// header types
export interface HeaderProps {
  status: string;
  nowPlayer: string;
}

// playerField
export interface PlayerProps {
  myCards: object[];
  findTargetGroup: string;
  selectUseCardHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sendUseCardHandler: () => void;
  selectDisCardHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  enemyPlayerA: number;
  enemyPlayerB: number;
  teamPlayer: number;
  thisPlayer: number;
  setSelectTarget: Dispatch<SetStateAction<string>>;
  myState: PlayerSetProps;
  sendStompMsg: (data: string) => void;
}

// profile
export interface ProfileProps {
  myState: PlayerSetProps;
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

// mainfield
export interface MainProps {
  enemyPlayerA: PlayerSetProps;
  enemyPlayerB: PlayerSetProps;
  teamPlayer: PlayerSetProps;
  thisPlayer: PlayerSetProps;
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
