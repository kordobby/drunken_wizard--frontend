import { createSlice } from "@reduxjs/toolkit";
import { playersSetting, Card } from "../../typings/typedb";

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
    cardCrave: string; // 버려진 카드, 사용한 카드, 드로우 실패 카드
    targetPlayer: number;
    selectedCard: number;
    timer: string;
  };
}

const initialState: ingameState = {
  players: {
    thisPlayer: {
      cardsOnHand: "",
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
    teamPlayer: {
      cardsOnHand: "",
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
      cardsOnHand: "",
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
      cardsOnHand: "",
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
    selectedCard: 0,
    timer: "",
  },
};

/* Reducer */
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // 초기 셋팅, 매 턴마다 상태 변화시
    setNowPlayerTK: (state, action) => {
      state.game.nowPlayer = action.payload;
    },
    setNowPlayerIdTK: (state, action) => {
      state.game.nowPlayerId = action.payload;
    },
    setThisPlayerTK: (state, action) => {
      state.players.thisPlayer = action.payload;
    },
    setTeamPlayerTK: (state, action) => {
      state.players.teamPlayer = action.payload;
    },
    setEnemyPlayerATK: (state, action) => {
      state.players.enemyPlayerA = action.payload;
    },
    setEnemyPlayerBTK: (state, action) => {
      state.players.enemyPlayerB = action.payload;
    },
    // 서버에서 받아온 카드를 그리자
    setMyCardsTK: (state, action) => {
      state.myCards = action.payload;
    },
    // 추가 드로우 카드
    addBonusCardTK: (state, action) => {
      state.myCards.push(action.payload);
    },
    setSelectedCardsTK: (state, action) => {
      state.game.selectedCard = action.payload;
    },
    // 사용한 카드 삭제하기 (사용하기 성공 또는 버리기 시 dispatch)
    useMyCardsTK: (state, action) => {
      state.myCards = state.myCards.filter(
        ({ cardId }) => cardId !== action.payload
      );
    },
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
  },
});

export const {
  setNowPlayerIdTK,
  setThisPlayerTK,
  setTeamPlayerTK,
  setEnemyPlayerATK,
  setEnemyPlayerBTK,
  setMyCardsTK,
  setNowPlayerTK,
  setCraveTK,
  setTargetTK,
  addBonusCardTK,
  useMyCardsTK,
  setSelectedCardsTK,
  setTimerTK,
} = gameSlice.actions;
export default gameSlice.reducer;
