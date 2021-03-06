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
      charactorClass: "HEALER",
      playerId: 1,
      health: 10,
      username: "hello",
      dead: false,
      mana: 13,
      manaCostModifierDuration: 0,
      mutedDuration: 1,
      petrifiedDuration: 2,
      poisonedDuration: 3,
      shield: true,
      sleepDuration: 2,
      stunnedDuration: 3,
      team: true,
      turnOrder: 0,
      weakDuration: 2,
      damageModifierDuration: 2,
    },
    teamPlayer: {
      cardsOnHand: [],
      charactorClass: "HEALER",
      playerId: 0,
      health: 3,
      username: "bye",
      dead: false,
      mana: 4,
      manaCostModifierDuration: 2,
      mutedDuration: 2,
      petrifiedDuration: 3,
      poisonedDuration: 2,
      shield: true,
      sleepDuration: 2,
      stunnedDuration: 1,
      team: true,
      turnOrder: 2,
      weakDuration: 3,
      damageModifierDuration: 2,
    },
    enemyPlayerA: {
      cardsOnHand: [],
      charactorClass: "HEALER",
      playerId: 0,
      health: 15,
      username: "yes",
      dead: false,
      mana: 12,
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
      charactorClass: "HEALER",
      playerId: 0,
      health: 15,
      username: "no",
      dead: false,
      mana: 13,
      manaCostModifierDuration: 0,
      mutedDuration: 0,
      petrifiedDuration: 2,
      poisonedDuration: 0,
      shield: false,
      sleepDuration: 3,
      stunnedDuration: 0,
      team: false,
      turnOrder: 1,
      weakDuration: 0,
      damageModifierDuration: 0,
    },
  },
  myCards: [],
  game: {
    status: "",
    gamOver: false, // ??????????????????!
    nowPlayer: "",
    nowPlayerId: 1,
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
    // ?????? ??????, ??? ????????? ?????? ?????????
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
    // ???????????? ????????? ????????? ?????????
    setMyCardsUpdateTK: (state, action) => {
      state.myCards = action.payload;
    }, // use
    setSelectableCardTK: (state, action) => {
      state.game.selectableCards = action.payload;
    }, // use
    setSelectDrawCardsTK: (state, action) => {
      state.game.selectedDrawCard = action.payload;
    }, // use
    // ????????? ??????, ????????? ??????, ????????? ????????? ??????
    setCraveTK: (state, action) => {
      state.game.cardCrave = action.payload;
    },
    // ????????? ???????????? ??????
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
