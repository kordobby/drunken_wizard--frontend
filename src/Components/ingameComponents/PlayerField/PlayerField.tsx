/* Package */
import React, { FunctionComponent, useState } from "react";

/* Hooks */
import { useAppSelector, useAppDispatch } from "../../../hooks/tsHooks";

/* Modules */
import {
  setSelectUseCardIdTK,
  setTargetTK,
} from "../../../redux/modules/ingameSlice";

/* Interface */
import {
  Card,
  PlayerFieldProps,
  playersSetting,
} from "../../../typings/typedb";

/* Components */
// import Cards from "./Cards";
import MyProfile from "./MyProfile";

/* CSS & SC */
import {
  PlayerFieldWrap,
  CardsArea,
  PlayerCtrlWrap,
  TurnOverBtn,
  TargetBtn,
  TargetNullBtn,
  PlayerCards,
} from "../InGameStyled";

const PlayerField: FunctionComponent<PlayerFieldProps> = ({
  sendStompMsgFunc,
}) => {
  /* useState */
  const [healCnt, setHealCnt] = useState<boolean>(false);
  const [disableHeal, setDisableHeal] = useState<boolean>(false);

  // card Use & Discard
  const [target, setTarget] = useState(0);
  const [mouseIn, setMouseIn] = useState(false);
  const [error, setError] = useState(false);

  /* tookit things */
  const dispatch = useAppDispatch();
  // card Use & Targeting settings
  const selectedUseCardId = useAppSelector(
    (state) => state.game.game.selectForUseCardId
  );
  const selectedTarget = useAppSelector(
    (state) => state.game.game.targetPlayer
  );

  // find my states
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayerId);
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);

  // settings for make buttons
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);

  /* UseCard Functions */
  // 카드 위로 마우스가 올라가면, 카드 아이디를 스토어에 저장
  const onMouseOverCards = (
    event: React.MouseEvent<HTMLDivElement>,
    cardId: number,
    mana: number
  ) => {
    setTarget(cardId); // 마우스를 오버했을 때 해당 item의 값으로 target 변경
    setMouseIn(Boolean(event)); // 마우스 오버 확인
    dispatch(setSelectUseCardIdTK(cardId));
    if (mana < thisPlayer.mana) {
      setError(true);
    } else {
      setError(false);
    }
  };

  // 카드를 떠나면 선택된 카드 초기화
  const onMouseLeaveCards = (event: React.MouseEvent<HTMLDivElement>) => {
    setTarget(0);
    setMouseIn(!event);
    dispatch(setSelectUseCardIdTK(0));
  };

  // 타겟팅 버튼 함수들
  const onMouseOverTargeting = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: playersSetting
  ) => {
    dispatch(setTargetTK(value));
  };
  const onMouseLeaveTargeting = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(setTargetTK(0));
  };

  // USECARD FUNC
  const useCardHandler = () => {
    const data = {
      cardId: selectedUseCardId,
      targetId: selectedTarget,
    };
    sendStompMsgFunc("1", thisPlayer.playerId, "USECARD", data);
  };

  // DISCARD FUNC
  const discardHanlder = () => {
    const data = {
      cardId: selectedUseCardId,
    };
    sendStompMsgFunc("1", thisPlayer.playerId, "DISCARD", data);
  };

  // about CSS function
  const generateClassName = (
    target: number,
    itemValue: number,
    isMouseIn: boolean
  ) => {
    if (itemValue === target && isMouseIn) {
      return "active";
    }
    if (itemValue === target || mouseIn) {
      return "normal";
    }
    return "default";
  };

  /* Healer 고유 능력 */
  const openHealModalHandler = () => {
    setHealCnt(!healCnt);
  };

  const sendHealMsgHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = (event.target as HTMLButtonElement).id;
    const data = {
      targetPlayerId: Number(targetId),
      cardId: 0,
    };
    sendStompMsgFunc("1", thisPlayer.playerId, "USECARD", data);
    setHealCnt(false);
    setDisableHeal(true);
  };

  // HEALER BTN(COMPONENT)
  const HealTargetBtns = playersList.map((value) => (
    <button
      id={String(value.playerId)}
      onClick={sendHealMsgHandler}
      className={String(value.playerId)}
      name={value.username}
    >
      {value.username}
    </button>
  ));

  /* 카드사용 관련 함수들 */

  // TARGETING BTN(COMPONENT) :: SELECT
  const TargetBtns = playersList.map((value) => (
    <TargetBtn
      key={value.playerId}
      onMouseOver={(event: any) => onMouseOverTargeting(event, value)}
      onMouseLeave={onMouseLeaveTargeting}
      onClick={useCardHandler}
      disabled={error}
    >
      {value.username}
    </TargetBtn>
  ));

  // TARGETING BTN(COMPONENT) :: ME / ALLY / ENEMY
  const TargetNullBtns = ["Me", "Ally", "Enemy"].map((value, index: number) => (
    <TargetNullBtn key={index} onClick={useCardHandler}>
      {value}
    </TargetNullBtn>
  ));

  return (
    <PlayerFieldWrap>
      <div>
        <MyProfile></MyProfile>
      </div>
      <CardsArea>
        {thisPlayer.cardsOnHand.map((value: Card, index: number) => (
          <PlayerCards
            key={value.cardId}
            className={generateClassName(target, index + 1, mouseIn)}
            onMouseOver={(event: any) =>
              onMouseOverCards(event, value.cardId, value.manaCost)
            }
            onMouseLeave={onMouseLeaveCards}
            value={value}
          >
            {nowPlayer === thisPlayer.playerId &&
              value.target === "SELECT" &&
              mouseIn &&
              target === value.cardId && (
                <>
                  {TargetBtns}
                  <button onClick={discardHanlder}>버리기</button>
                </>
              )}
            {nowPlayer === thisPlayer.playerId &&
              value.target === "Me" &&
              mouseIn && (
                <>
                  {TargetNullBtns[0]}
                  <button onClick={discardHanlder}>버리기</button>
                </>
              )}
            {nowPlayer === thisPlayer.playerId &&
              value.target === "Ally" &&
              mouseIn &&
              target === value.cardId && (
                <>
                  {TargetNullBtns[1]}
                  <button onClick={discardHanlder}>버리기</button>
                </>
              )}
            {nowPlayer === thisPlayer.playerId &&
              value.target === "Enemy" &&
              mouseIn &&
              target === value.cardId && (
                <>
                  {TargetNullBtns[2]}
                  <button onClick={discardHanlder}>버리기</button>
                </>
              )}
          </PlayerCards>
        ))}
      </CardsArea>
      <div>
        <PlayerCtrlWrap>
          {/* 힐러일 때 나오는 모달 창 */}
          {nowPlayer === thisPlayer.playerId &&
          thisPlayer.charactorClass === "HEALER" ? (
            <button onClick={openHealModalHandler} disabled={disableHeal}>
              heal
            </button>
          ) : (
            <></>
          )}
          {healCnt === true && (
            <div>
              {HealTargetBtns[0]}
              {HealTargetBtns[1]}
              {HealTargetBtns[2]}
              {HealTargetBtns[3]}
            </div>
          )}
          <TurnOverBtn
            onClick={() =>
              sendStompMsgFunc("1", thisPlayer.playerId, "ENDTURN", null)
            }
          >
            내 턴 종료하기
          </TurnOverBtn>
        </PlayerCtrlWrap>
      </div>
    </PlayerFieldWrap>
  );
};

export default PlayerField;
