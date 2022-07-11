/* Package */
import React, { FunctionComponent, useState } from "react";

/* Hooks */
import { useAppSelector, useAppDispatch } from "../../../hooks/tsHooks";

/* Modules */
import {
  setTargetTK,
  setSelectedCardsTK, // delete
} from "../../../redux/modules/ingameSlice";

/* Interface */
import { PlayerProps } from "../../../typings/typedb";

/* Components */
import Cards from "./Cards";
import MyProfile from "./MyProfile";

/* CSS & SC */
import {
  PlayerFieldWrap,
  CardsArea,
  PlayerCtrlWrap,
  TargetBtn,
} from "../InGameStyled";

const PlayerField: FunctionComponent<PlayerProps> = ({
  setFindTargetGroup,
  findTargetGroup,
  selectUseCardHandler,
  sendUseCardHandler,
  selectDisCardHandler,
  setSelectTarget,
  sendStompMsgFunc,
  selectedCardName,
}) => {
  /* useState */
  const [healCnt, setHealCnt] = useState<boolean>(false);
  const [disableHeal, setDisableHeal] = useState<boolean>(false);

  /* tookit things */
  const dispatch = useAppDispatch();
  const myCards = useAppSelector((state) => state.game?.myCards);
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayer);
  const nowPlayerId = useAppSelector((state) => state.game.game.nowPlayerId);
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const playersData = useAppSelector((state) => state.game.players);
  const targetSet = useAppSelector((state) => state.game.game.targetPlayer);
  const playersList = Object.values(playersData);

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
    setFindTargetGroup("SELECT");
    sendStompMsgFunc("1", thisPlayer.playerId, "USECARD", data);
    setHealCnt(false);
    setDisableHeal(true);
  };

  // HEALER BTN(COMPONENT)
  const HealTargetBtns = playersList.map((value) => (
    <TargetBtn
      id={String(value.playerId)}
      onClick={sendHealMsgHandler}
      className={String(value.playerId)}
      name={value.username}
    >
      {value.username}
    </TargetBtn>
  ));

  /* 카드사용 관련 함수들 */
  const confirmTargetHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = (event.target as HTMLButtonElement).id;
    setSelectTarget(Number(targetId));
    dispatch(setTargetTK(targetId));
  };

  // TARGETING BTN(COMPONENT) :: SELECT
  const TargetBtns = playersList.map((value) => (
    <TargetBtn
      id={String(value.playerId)}
      onClick={confirmTargetHandler}
      className={String(value.playerId)}
      name={value.username}
    >
      {value.username}
    </TargetBtn>
  ));

  // TARGETING BTN(COMPONENT) :: ME / ALLY / ENEMY
  const TargetNullBtn = ["Me", "Ally", "Enemy"].map((value) => (
    <TargetBtn onClick={confirmTargetHandler} id="0" className="auto">
      {value}
    </TargetBtn>
  ));

  return (
    <PlayerFieldWrap>
      <div>
        <MyProfile></MyProfile>
      </div>
      <CardsArea>
        {myCards.map((value: any) => (
          <Cards
            key={value?.cardId}
            id={value?.cardId}
            className={value?.target}
            name={value?.cardName}
            selectUseCardHandler={selectUseCardHandler}
            selectDisCardHandler={selectDisCardHandler}
          ></Cards>
        ))}
      </CardsArea>
      <div>
        <PlayerCtrlWrap>
          {/* TARGET GROUP => "ME : 자신", "SELECT : 나 포함 모든 사람 중 하나", "ENEMY : 모든 적", "ALLY : 모든 아군"*/}
          {/* ME, ENEMY, ALLY => null, SELECT => targetID */}

          {findTargetGroup === "ME" && (
            <div>
              <p>선택한 카드 : {selectedCardName}</p> {TargetNullBtn[0]}
            </div>
          )}
          {findTargetGroup === "ALLY" && (
            <div>
              <p>선택한 카드 : {selectedCardName}</p> {TargetNullBtn[1]}
            </div>
          )}
          {findTargetGroup === "ENEMY" && (
            <div>
              <p>선택한 카드 : {selectedCardName}</p> {TargetNullBtn[2]}
            </div>
          )}
          <p>{nowPlayerId}</p>
          <p>{thisPlayer.playerId}</p>
          {findTargetGroup === "SELECT" && (
            <div>
              <p>선택한 카드 : {selectedCardName}</p>
              <p>타겟을 설정해주세요!</p>
              <p>선택한 타켓 : {targetSet}</p>
              {TargetBtns[0]}
              {TargetBtns[1]}
              {TargetBtns[2]}
              {TargetBtns[3]}
            </div>
          )}
          {/* 힐러일 때 나오는 모달 창 */}
          {nowPlayerId === thisPlayer.playerId &&
          thisPlayer.charactorClass === "HEALER" ? (
            <TargetBtn onClick={openHealModalHandler} disabled={disableHeal}>
              heal
            </TargetBtn>
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
          {nowPlayerId === thisPlayer.playerId && (
            <div>
              <TargetBtn onClick={sendUseCardHandler}>카드 사용하기</TargetBtn>
              <TargetBtn
                onClick={() =>
                  sendStompMsgFunc("1", thisPlayer.playerId, "ENDTURN", null)
                }
              >
                내 턴 종료하기
              </TargetBtn>
            </div>
          )}
        </PlayerCtrlWrap>
      </div>
    </PlayerFieldWrap>
  );
};

export default PlayerField;
