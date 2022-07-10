import React, { FunctionComponent } from "react";
import { PlayerFieldWrap } from "../InGameStyled";
import { CardsArea, PlayerCtrlWrap } from "../InGameStyled";
import Cards from "./Cards";
import { PlayerProps } from "../../../typings/typedb";
import MyProfile from "./MyProfile";
import { useAppSelector } from "../../../hooks/tsHooks";
import { useState } from "react";
import { TargetBtn } from "../InGameStyled";
import {
  setTargetTK,
  setSelectedCardsTK,
} from "../../../redux/modules/ingameSlice";
import { useAppDispatch } from "../../../hooks/tsHooks";

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
  const dispatch = useAppDispatch();
  const [healCnt, setHealCnt] = useState<boolean>(false);
  const [disableHeal, setDisableHeal] = useState<boolean>(false);

  const myCards = useAppSelector((state) => state.game?.myCards);
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayer);
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);

  /* Healer 고유 능력 */
  const openHealModalHandler = () => {
    setHealCnt(!healCnt);
  };

  const sendHealMsgHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = (event.target as HTMLButtonElement).id;
    const data = {
      targetId: Number(targetId),
      cardId: 0,
    };
    setFindTargetGroup("SELECT");
    sendStompMsgFunc("1", thisPlayer.playerId, "USECARD", data);
    setHealCnt(false);
    setDisableHeal(true);
  };

  // 힐러가 사용하는 버튼들
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
    console.log(Number(targetId)); // 타겟을 찾는다
    setSelectTarget(Number(targetId)); // 타겟을 보낸다
    dispatch(setTargetTK(targetId));
  };
  const TargetBtns = playersList.map((value) => (
    // 타겟 버튼에 플레이어의 id와 유저 이름이 들어감
    <TargetBtn
      id={String(value.playerId)}
      onClick={confirmTargetHandler}
      className={String(value.playerId)}
      name={value.username}
    >
      {value.username}
    </TargetBtn>
  ));
  const TargetNullBtn = ["Me", "Ally", "Enemy"].map((value) => (
    <TargetBtn onClick={confirmTargetHandler} id="0" className="auto">
      {value}
    </TargetBtn>
  ));

  const targetbaby = useAppSelector((state) => state.game.game.targetPlayer);
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
          {findTargetGroup === "SELECT" && (
            <div>
              <p>선택한 카드 : {selectedCardName}</p>
              <p>타겟을 설정해주세요!</p>
              <p>선택한 타켓 : {targetbaby}</p>
              {TargetBtns[0]}
              {TargetBtns[1]}
              {TargetBtns[2]}
              {TargetBtns[3]}
            </div>
          )}
          {/* 힐러일 때 나오는 모달 창 */}
          {nowPlayer === thisPlayer.username &&
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
          {nowPlayer === thisPlayer.username && (
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
