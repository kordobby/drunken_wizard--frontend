/* Package */
import React, { FunctionComponent, useState, useEffect } from "react";

/* Hooks */
import { useAppSelector, useAppDispatch } from "../../../hooks/tsHooks";
import { useParams } from "react-router-dom";

/* Modules */
import {
  setSelectUseCardIdTK,
  setTargetTK,
  setCardTypeTK,
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
  TargetBtn,
  TargetNullBtn,
  PlayerCards,
  DisCardBrn,
  TargetBtnBox,
  Divider,
  TurnTap,
  TurnHealBtn,
  SendHealBtn,
} from "../InGameStyled/InGameStyled";

const PlayerField: FunctionComponent<PlayerFieldProps> = ({
  sendStompMsgFunc,
}) => {
  /* useState */
  const [healCnt, setHealCnt] = useState<boolean>(false);
  const [disableHeal, setDisableHeal] = useState<boolean>(false);

  // card Use & Discard
  const [target, setTarget] = useState(0);
  const [mouseIn, setMouseIn] = useState(false);
  const [clicked, setClicked] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  }, [clicked]);

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

  const { roomId } = useParams<{ roomId?: string }>();

  /* UseCard Functions */
  // 카드 위로 마우스가 올라가면, 카드 아이디를 스토어에 저장
  const onMouseOverCards = (
    event: React.MouseEvent<HTMLDivElement>,
    cardId: number
  ) => {
    setTarget(cardId); // 마우스를 오버했을 때 해당 item의 값으로 target 변경
    setMouseIn(Boolean(event)); // 마우스 오버 확인
    dispatch(setSelectUseCardIdTK(cardId));
    dispatch(setCardTypeTK("ENEMY"));
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
    dispatch(setTargetTK(value.playerId));
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
      targetPlayerId: selectedTarget,
    };
    setClicked(true); // 중복클릭 방지
    sendStompMsgFunc(roomId, thisPlayer.playerId, "USECARD", data);
  };

  // DISCARD FUNC
  const discardHanlder = () => {
    const data = {
      cardId: selectedUseCardId,
    };
    setClicked(true); // 중복클릭 방지
    sendStompMsgFunc(roomId, thisPlayer.playerId, "DISCARD", data);
  };

  // about CSS function
  const generateClassName = (
    target: number,
    itemValue: number,
    isMouseIn: boolean
  ) => {
    if (itemValue === target && isMouseIn) {
      console.log(target);
      console.log(isMouseIn);
      return "active";
    }
    if (itemValue === target || mouseIn) {
      console.log("workin");
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
    sendStompMsgFunc(roomId, thisPlayer.playerId, "USECARD", data);
    setHealCnt(false);
    setDisableHeal(true);
  };

  // HEALER BTN(COMPONENT)
  const HealTargetBtns = playersList.map((value, index) => (
    <TurnHealBtn
      id={String(value.playerId)}
      onClick={sendHealMsgHandler}
      className={String(value.playerId)}
      name={value.username}
      disabled={clicked}
      dead={value.team === thisPlayer.team}
    >
      {value.username}
    </TurnHealBtn>
  ));

  /* 카드사용 관련 함수들 */

  // TARGETING BTN(COMPONENT) :: SELECT
  const TargetBtns = playersList.map((value) => (
    <TargetBtn
      key={value.playerId}
      onMouseOver={(event: any) => onMouseOverTargeting(event, value)}
      onMouseLeave={onMouseLeaveTargeting}
      onClick={useCardHandler}
      disabled={clicked}
    >
      {value.username}
    </TargetBtn>
  ));

  // TARGETING BTN(COMPONENT) :: ME / ALLY / ENEMY
  const TargetNullBtns = ["ME", "ALLY", "ENEMY"].map((value, index: number) => (
    <TargetNullBtn
      key={index}
      color={value}
      onClick={useCardHandler}
      disabled={clicked}
    >
      {value}
    </TargetNullBtn>
  ));

  const Cardss = [
    {
      cardId: 1,
      target: "SELECT",
      description: "hello",
      manaCost: 2,
      cardName: "resistance",
    },
    {
      cardId: 9,
      target: "SELECT",
      description: "hello",
      manaCost: 2,
      cardName: "shield",
    },
    {
      cardId: 4,
      target: "SELECT",
      description: "hello",
      manaCost: 2,
      cardName: "mute",
    },
    {
      cardId: 2,
      target: "SELECT",
      description: "hello",
      manaCost: 2,
      cardName: "beerMug",
    },
    {
      cardId: 14,
      target: "SELECT",
      description: "hello",
      manaCost: 2,
      cardName: "panacea",
    },
    {
      cardId: 7,
      target: "SELECT",
      description: "hello",
      manaCost: 2,
      cardName: "fireBall",
    },
  ];
  return (
    <PlayerFieldWrap>
      <MyProfile></MyProfile>
      <CardsArea>
        <Divider></Divider>
        {/*thisPlayer.cardsOnHand */}
        {Cardss.map((value: Card) => (
          <PlayerCards
            key={value.cardId}
            className={generateClassName(target, value.cardId, mouseIn)}
            onMouseOver={(event: any) => onMouseOverCards(event, value.cardId)}
            onMouseLeave={onMouseLeaveCards}
            value={value}
          >
            {nowPlayer === thisPlayer.playerId &&
              value.target === "SELECT" &&
              mouseIn &&
              target === value.cardId && (
                <>
                  <TargetBtnBox>{TargetBtns}</TargetBtnBox>
                  <DisCardBrn onClick={discardHanlder}>버리기</DisCardBrn>
                </>
              )}
            {nowPlayer === thisPlayer.playerId &&
              value.target === "ME" &&
              mouseIn &&
              target === value.cardId && (
                <>
                  {TargetNullBtns[0]}
                  <DisCardBrn onClick={discardHanlder}>버리기</DisCardBrn>
                </>
              )}
            {nowPlayer === thisPlayer.playerId &&
              value.target === "ALLY" &&
              mouseIn &&
              target === value.cardId && (
                <>
                  {TargetNullBtns[1]}
                  <DisCardBrn onClick={discardHanlder}>버리기</DisCardBrn>
                </>
              )}
            {nowPlayer === thisPlayer.playerId &&
              value.target === "ENEMY" &&
              mouseIn &&
              target === value.cardId && (
                <>
                  {TargetNullBtns[2]}
                  <DisCardBrn onClick={discardHanlder}>버리기</DisCardBrn>
                </>
              )}
          </PlayerCards>
        ))}
      </CardsArea>
      <div>
        <PlayerCtrlWrap>
          {thisPlayer.charactorClass === "HEALER" ? (
            <>
              <TurnTap>
                {thisPlayer.playerId === nowPlayer && healCnt === true ? (
                  <>
                    <span>힐 대상 선택</span>
                    <div className="turn__button--box">{HealTargetBtns}</div>
                  </>
                ) : (
                  <>
                    <span>순서 확인</span>
                    <div className="turn__button--box">
                      {playersList.map((value) => (
                        <TurnHealBtn dead={value.team === thisPlayer.team}>
                          {value.turnOrder}
                        </TurnHealBtn>
                      ))}
                    </div>
                  </>
                )}
              </TurnTap>
              <SendHealBtn
                disabled={disableHeal}
                onClick={openHealModalHandler}
              >
                Heal
              </SendHealBtn>
            </>
          ) : (
            <TurnTap>
              <span>순서확인</span>
              <div className="turn__button--box">
                {playersList.map((value) => (
                  <TurnHealBtn dead={value.team === thisPlayer.team}>
                    {value.turnOrder}
                  </TurnHealBtn>
                ))}
              </div>
            </TurnTap>
          )}
        </PlayerCtrlWrap>
      </div>
    </PlayerFieldWrap>
  );
};

export default PlayerField;
