import { Dispatch, SetStateAction } from "react";

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
  sendStompMsg: (data: string) => void;
}

// cards
export interface CardProps {
  id: number;
  className: string;
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
