/* Package */
import React, { FunctionComponent, useState, useEffect } from "react";

/* Hooks */
import { useAppSelector, useAppDispatch } from "../../../hooks/tsHooks";
import { useParams } from "react-router-dom";

/* Modules */
import {
  setSelectUseCardTK,
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
import AlertPopUp from "../InGameCommon/AlertPopUp";
import {
  TurnBtn,
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
  ActionFailText,
} from "../InGameStyled/InGameStyled";

const PlayerField: FunctionComponent<PlayerFieldProps> = ({
  sendStompMsgFunc,
  status,
}) => {
  /* useState */
  const [healCnt, setHealCnt] = useState<boolean>(false);
  const [disableHeal, setDisableHeal] = useState<boolean>(false);

  // card Use & Discard
  const [target, setTarget] = useState(0);
  const [mouseIn, setMouseIn] = useState(false);
  const [clicked, setClicked] = useState(false);

  // alert modal
  const [useFail, setUseFail] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClicked(false);
    }, 1000);

    setTimeout(() => {
      setUseFail(false);
    }, 1000);
  }, [clicked, useFail]);

  /* tookit things */
  const dispatch = useAppDispatch();
  // card Use & Targeting settings
  const selectedUseCard = useAppSelector(
    (state) => state.game.game.selectForUseCard
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
    cardValue: Card
  ) => {
    setTarget(cardValue.cardId); // 마우스를 오버했을 때 해당 item의 값으로 target 변경
    setMouseIn(Boolean(event)); // 마우스 오버 확인
    dispatch(setSelectUseCardTK(cardValue));
  };

  // 카드를 떠나면 선택된 카드 초기화
  const onMouseLeaveCards = (event: React.MouseEvent<HTMLDivElement>) => {
    setTarget(0);
    setMouseIn(!event);
    dispatch(
      setSelectUseCardTK({
        cardName: "",
        target: "",
        cardId: 0,
        description: "",
        manaCost: 0,
      })
    );
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
  const cardUseHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: playersSetting | null
  ) => {
    if (value?.dead === true && value !== null) {
      setUseFail(true);
      return;
    } else {
      console.log("hey");
      const data = {
        cardId: selectedUseCard.cardId,
        targetPlayerId: selectedTarget,
      };
      setClicked(true); // 중복클릭 방지
      sendStompMsgFunc(roomId, thisPlayer.playerId, "USECARD", data);
    }
  };

  // DISCARD FUNC
  const discardHanlder = () => {
    const data = {
      cardId: selectedUseCard.cardId,
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

  const sendHealMsgHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: playersSetting
  ) => {
    if (value.dead === true) {
      setUseFail(true);
      return;
    } else {
      const data = {
        targetPlayerId: target,
        cardId: 0,
      };
      sendStompMsgFunc(roomId, thisPlayer.playerId, "USECARD", data);
      setHealCnt(false);
      setDisableHeal(true);
    }
  };

  // HEALER BTN(COMPONENT)
  const HealTargetBtns = playersList.map((value, index) => (
    <TurnHealBtn
      onClick={(event: any) => sendHealMsgHandler(event, value)}
      value={value.playerId}
      disabled={clicked}
      team={value.team === thisPlayer.team}
      onMouseOver={(event: any) => onMouseOverTargeting(event, value)}
      onMouseLeave={onMouseLeaveTargeting}
    >
      {value.username}
    </TurnHealBtn>
  ));

  /* 카드사용 관련 함수들 */

  // TARGETING BTN(COMPONENT) :: SELECT
  const TargetBtns = playersList.map((value, index) => (
    <TargetBtn
      key={value.playerId}
      onMouseOver={(event: any) => onMouseOverTargeting(event, value)}
      onMouseLeave={onMouseLeaveTargeting}
      onClick={(event: any) => cardUseHandler(event, value)}
      disabled={clicked}
      value={value.playerId}
      team={value.team === thisPlayer.team}
    >
      {index === 0 && "E1"}
      {index === 1 && "E2"}
      {index === 2 && "AL"}
      {index === 3 && "ME"}
    </TargetBtn>
  ));

  // TARGETING BTN(COMPONENT) :: ME / ALLY / ENEMY
  const TargetNullBtns = ["ME", "ALLY", "ENEMY"].map((value, index: number) => (
    <TargetNullBtn
      key={index}
      color={value}
      onClick={(event: any) => cardUseHandler(event, null)}
      disabled={clicked}
    >
      {value}
    </TargetNullBtn>
  ));

  return (
    <>
      {useFail && (
        <AlertPopUp
          upperText="카드 사용 불가!"
          middleText="이미 사망한 플레이어입니다."
          bottomText=""
        ></AlertPopUp>
      )}
      <PlayerFieldWrap>
        <MyProfile></MyProfile>

        <CardsArea>
          <Divider></Divider>
          {thisPlayer.mutedDuration <= 0 ? (
            <>
              {thisPlayer.cardsOnHand.map((value: Card) => (
                <PlayerCards
                  key={value.cardId}
                  className={generateClassName(target, value.cardId, mouseIn)}
                  onMouseOver={(event: any) => onMouseOverCards(event, value)}
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
            </>
          ) : (
            <ActionFailText>
              <span>shit... 침묵에 걸린 자는 턴을 넘길 수 밖에..</span>
            </ActionFailText>
          )}
        </CardsArea>
        <div>
          <PlayerCtrlWrap>
            {thisPlayer.charactorClass === "HEALER" &&
            thisPlayer.mutedDuration <= 0 ? (
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
                          <TurnBtn
                            key={value.playerId}
                            team={value.team === thisPlayer.team}
                          >
                            {value.turnOrder}
                          </TurnBtn>
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
                    <TurnBtn team={value.team === thisPlayer.team}>
                      {value.turnOrder}
                    </TurnBtn>
                  ))}
                </div>
              </TurnTap>
            )}
          </PlayerCtrlWrap>
        </div>
      </PlayerFieldWrap>
    </>
  );
};

export default PlayerField;
