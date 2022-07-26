import { createSlice } from "@reduxjs/toolkit";
import { playersSetting, Card, DrawCard } from "../../typings/typedb";

interface ingameState {
  players: {
    PlayerB: playersSetting;
    PlayerC: playersSetting;
    PlayerA: playersSetting;
    thisPlayer: playersSetting;
  };
  myCards: Card[];
  game: {
    status: string;
    gamOver: boolean;
    order: number[];
    nowPlayer: string;
    nowPlayerId: number;
    cardCrave: Card[];
    targetPlayer: number;
    selectForUseCard: Card;
    selectableCnt: number;
    selectableCards: Card[];
    selectedDrawCard: number[];
    timer: string;
    drawSelectCards: DrawCard[];
  };
}

const initialState: ingameState = {
  players: {
    PlayerB: {
      cardsOnHand: [],
      charactorClass: "WAROCK",
      playerId: 3,
      health: 0,
      username: "enemyL",
      dead: true,
      mana: 0,
      manaCostModifierDuration: 0,
      mutedDuration: 0,
      petrifiedDuration: 0,
      poisonedDuration: 0,
      shield: false,
      sleepDuration: 0,
      stunnedDuration: 0,
      team: false,
      turnOrder: 2,
      weakDuration: 0,
      damageModifierDuration: 0,
    },
    PlayerC: {
      cardsOnHand: [],
      charactorClass: "BLOODMAGE",
      playerId: 1,
      health: 0,
      username: "enemyR",
      dead: true,
      mana: 0,
      manaCostModifierDuration: 0,
      mutedDuration: 0,
      petrifiedDuration: 0,
      poisonedDuration: 0,
      shield: false,
      sleepDuration: 0,
      stunnedDuration: 0,
      team: false,
      turnOrder: 4,
      weakDuration: 0,
      damageModifierDuration: 0,
    },
    PlayerA: {
      cardsOnHand: [],
      charactorClass: "FARSEER",
      playerId: 2,
      health: 5,
      username: "team",
      dead: true,
      mana: 5,
      manaCostModifierDuration: 1,
      mutedDuration: 2,
      petrifiedDuration: 1,
      poisonedDuration: 2,
      shield: true,
      sleepDuration: 2,
      stunnedDuration: 2,
      team: true,
      turnOrder: 3,
      weakDuration: -3,
      damageModifierDuration: 2,
    },
    thisPlayer: {
      cardsOnHand: [],
      charactorClass: "HEALER",
      playerId: 4,
      health: 25,
      username: "me",
      dead: false,
      mana: 5,
      manaCostModifierDuration: 1,
      mutedDuration: 0,
      petrifiedDuration: 1,
      poisonedDuration: 2,
      shield: false,
      sleepDuration: 2,
      stunnedDuration: 2,
      team: true,
      turnOrder: 1,
      weakDuration: 3,
      damageModifierDuration: 2,
    },
  },
  myCards: [],
  game: {
    status: "",
    order: [],
    gamOver: false, // 필요없을지도!
    nowPlayer: "",
    nowPlayerId: 4,
    cardCrave: [],
    targetPlayer: 0,
    selectForUseCard: {
      cardId: 0,
      cardName: "",
      description: "",
      manaCost: 0,
      target: "",
    },
    drawSelectCards: [],
    selectableCards: [],
    selectableCnt: 2,
    selectedDrawCard: [],
    timer: "",
  },
};

/* Reducer */
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // 초기 셋팅, 매 턴마다 상태 변화시
    setPlayOrderTK: (state, action) => {
      state.game.order = action.payload;
    },
    setNowPlayerNameTK: (state, action) => {
      state.game.nowPlayer = action.payload;
    }, // use
    setNowPlayerIdTK: (state, action) => {
      state.game.nowPlayerId = action.payload;
    }, // use
    setThisPlayerTK: (state, action) => {
      state.players.thisPlayer = action.payload;
    }, // use
    setPlayerATK: (state, action) => {
      state.players.PlayerA = action.payload;
    }, // use
    setPlayerBTK: (state, action) => {
      state.players.PlayerB = action.payload;
    }, // use
    setPlayerCTK: (state, action) => {
      state.players.PlayerC = action.payload;
    }, // use
    // 서버에서 받아온 카드를 그리자
    setMyCardsUpdateTK: (state, action) => {
      state.myCards = action.payload;
    }, // use
    setSelectableCardTK: (state, action) => {
      state.game.selectableCards = action.payload;
    }, // use
    setSelectDrawCardsTK: (state, action) => {
      state.game.selectedDrawCard = action.payload;
    }, // use
    // 사용한 카드, 버려진 카드, 드로우 실패한 카드
    setCraveTK: (state, action) => {
      state.game.cardCrave.unshift(action.payload);
    },
    // 마지막 타켓팅된 유저
    setTargetTK: (state, action) => {
      state.game.targetPlayer = action.payload;
    },
    setTimerTK: (state, action) => {
      state.game.timer = action.payload;
    },
    setSelectableCardCnt: (state, action) => {
      state.game.selectableCnt = action.payload;
    },
    setSelectUseCardTK: (state, action) => {
      state.game.selectForUseCard = action.payload;
    },
    setDrawCardSelectTK: (state, action) => {
      state.game.drawSelectCards.push(action.payload);
    },
    cancelSelectDrawCardsTK: (state, action) => {
      state.game.drawSelectCards = state.game.drawSelectCards.filter(
        (value) => value.cardId !== action.payload.cardId
      );
    },
    clearDrawCardsTK: (state, action) => {
      state.game.drawSelectCards = [];
    },
    updateMyCardsTK: (state, action) => {
      state.players.thisPlayer.cardsOnHand = action.payload;
    },
  },
});

export const {
  setPlayOrderTK,
  setNowPlayerIdTK,
  setNowPlayerNameTK,
  setThisPlayerTK, // use
  setPlayerATK, // use
  setPlayerBTK, // use
  setPlayerCTK, // use
  setCraveTK, // use
  setTargetTK, // use
  setTimerTK, // use
  cancelSelectDrawCardsTK, // use
  setSelectableCardCnt, //use
  setSelectableCardTK, // use
  setMyCardsUpdateTK, // use
  setSelectUseCardTK, // use
  setDrawCardSelectTK, // use
  clearDrawCardsTK, // use
  updateMyCardsTK, // use
} = gameSlice.actions;
export default gameSlice.reducer;
