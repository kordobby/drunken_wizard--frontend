import { createSlice } from "@reduxjs/toolkit";
import { playersSetting, Card, DrawCard } from "../../typings/typedb";

interface ingameState {
  players: {
    thisPlayer: playersSetting;
    teamPlayer: playersSetting;
    enemyPlayerA: playersSetting;
    enemyPlayerB: playersSetting;
  };
  myCards: Card[];
  game: {
    status: string;
    gamOver: boolean;
    nowPlayer: string;
    nowPlayerId: number;
    cardCrave: string;
    targetPlayer: number;
    selectForUseCardId: number;
    selectForUseCardName: string;
    selectableCnt: number;
    selectableCards: Card[];
    selectedDrawCard: number[];
    timer: string;
    drawSelectCards: DrawCard[];
  };
}

const initialState: ingameState = {
  players: {
    thisPlayer: {
      cardsOnHand: [],
      charactorClass: "",
      playerId: 0,
      health: 0,
      username: "",
      dead: false,
      mana: 0,
      manaCostModifierDuration: 0,
      mutedDuration: 0,
      petrifiedDuration: 0,
      poisonedDuration: 0,
      shield: false,
      sleepDuration: 0,
      stunnedDuration: 0,
      team: false,
      turnOrder: 3,
      weakDuration: 0,
      damageModifierDuration: 0,
    },
    teamPlayer: {
      cardsOnHand: [],
      charactorClass: "",
      playerId: 0,
      health: 0,
      username: "",
      dead: false,
      mana: 0,
      manaCostModifierDuration: 0,
      mutedDuration: 0,
      petrifiedDuration: 0,
      poisonedDuration: 0,
      shield: false,
      sleepDuration: 0,
      stunnedDuration: 0,
      team: false,
      turnOrder: 0,
      weakDuration: 0,
      damageModifierDuration: 0,
    },
    enemyPlayerA: {
      cardsOnHand: [],
      charactorClass: "",
      playerId: 0,
      health: 0,
      username: "",
      dead: false,
      mana: 0,
      manaCostModifierDuration: 0,
      mutedDuration: 0,
      petrifiedDuration: 0,
      poisonedDuration: 0,
      shield: false,
      sleepDuration: 0,
      stunnedDuration: 0,
      team: false,
      turnOrder: 0,
      weakDuration: 0,
      damageModifierDuration: 0,
    },
    enemyPlayerB: {
      cardsOnHand: [],
      charactorClass: "",
      playerId: 0,
      health: 0,
      username: "",
      dead: false,
      mana: 0,
      manaCostModifierDuration: 0,
      mutedDuration: 0,
      petrifiedDuration: 0,
      poisonedDuration: 0,
      shield: false,
      sleepDuration: 0,
      stunnedDuration: 0,
      team: false,
      turnOrder: 0,
      weakDuration: 0,
      damageModifierDuration: 0,
    },
  },
  myCards: [],
  game: {
    status: "",
    gamOver: false, // 필요없을지도!
    nowPlayer: "",
    nowPlayerId: 0,
    cardCrave: "",
    targetPlayer: 0,
    selectForUseCardId: 0,
    selectForUseCardName: "",
    drawSelectCards: [],
    selectableCards: [],
    selectableCnt: 0,
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
    setNowPlayerNameTK: (state, action) => {
      state.game.nowPlayer = action.payload;
    }, // use
    setNowPlayerIdTK: (state, action) => {
      state.game.nowPlayerId = action.payload;
    }, // use
    setThisPlayerTK: (state, action) => {
      state.players.thisPlayer = action.payload;
    }, // use
    setTeamPlayerTK: (state, action) => {
      state.players.teamPlayer = action.payload;
    }, // use
    setEnemyPlayerATK: (state, action) => {
      state.players.enemyPlayerA = action.payload;
    }, // use
    setEnemyPlayerBTK: (state, action) => {
      state.players.enemyPlayerB = action.payload;
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
      state.game.cardCrave = action.payload;
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
    setSelectUseCardIdTK: (state, action) => {
      state.game.selectForUseCardId = action.payload;
    },
    setSelectUseCardNameTK: (state, action) => {
      state.game.selectForUseCardName = action.payload;
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
  setNowPlayerIdTK,
  setNowPlayerNameTK,
  setThisPlayerTK, // use
  setTeamPlayerTK, // use
  setEnemyPlayerATK, // use
  setEnemyPlayerBTK, // use
  setCraveTK,
  setTargetTK, // use
  setTimerTK, // use
  cancelSelectDrawCardsTK, // use
  setSelectableCardCnt, //use
  setSelectableCardTK, // use
  setMyCardsUpdateTK, // use
  setSelectUseCardIdTK, // use
  setSelectUseCardNameTK,
  setDrawCardSelectTK, // use
  clearDrawCardsTK, // use
  updateMyCardsTK, // use
} = gameSlice.actions;
export default gameSlice.reducer;
