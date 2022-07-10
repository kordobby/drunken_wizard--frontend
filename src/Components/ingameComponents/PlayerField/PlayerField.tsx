import React, { FunctionComponent } from "react";
import { PlayerFieldWrap } from "../InGameStyled";
import { CardsArea, PlayerCtrlWrap } from "../InGameStyled";
import Cards from "./Cards";
import { PlayerProps } from "../../../typings/typedb";
import MyProfile from "./MyProfile";
import { useAppSelector } from "../../../hooks/tsHooks";
import { useState } from "react";
import { TargetBtn } from "../InGameStyled";
const PlayerField: FunctionComponent<PlayerProps> = ({
  findTargetGroup,
  selectUseCardHandler,
  sendUseCardHandler,
  selectDisCardHandler,
  setSelectTarget,
  sendStompMsgFunc,
}) => {
  const [healCnt, setHealCnt] = useState<boolean>(false);
  const [disableHeal, setDisableHeal] = useState<boolean>(false);

  const myCards = useAppSelector((state) => state.game?.myCards);
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayer);
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const teamPlayer = useAppSelector((state) => state.game.players.teamPlayer);
  console.log(myCards);
  const enemyPlayerA = useAppSelector(
    (state) => state.game.players.enemyPlayerA
  );
  const enemyPlayerB = useAppSelector(
    (state) => state.game.players.enemyPlayerB
  );
  console.log(myCards);
  // 카드를 사용할 대상 선택
  const confirmTargetHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = (event.target as HTMLButtonElement).className;
    setSelectTarget(Number(targetId));
    console.log(Number(targetId));
  };

  const openHealHandler = () => {
    setHealCnt(true);
  };
  const actionTurnOverController = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const targetId = (event.target as HTMLButtonElement).className;
    const data = {
      targetID: Number(targetId),
    };
    sendStompMsgFunc("1", thisPlayer.playerId, "HEAL???????", data);
    setHealCnt(false);
    setDisableHeal(true);
  };

  return (
    <PlayerFieldWrap>
      <div>
        <MyProfile></MyProfile>
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
      </div>
      <div>
        <PlayerCtrlWrap>
          {findTargetGroup === "ME" && (
            <button
              onClick={confirmTargetHandler}
              className={String(thisPlayer.playerId)}
              name={String(thisPlayer.username)}
            >
              {thisPlayer.username}
            </button>
          )}
          {findTargetGroup === "SELECT" && (
            <>
              <TargetBtn
                onClick={confirmTargetHandler}
                className={String(enemyPlayerA.playerId)}
              >
                {enemyPlayerA.username}
              </TargetBtn>
              <TargetBtn
                onClick={confirmTargetHandler}
                className={String(enemyPlayerB.playerId)}
              >
                {enemyPlayerB.username}
              </TargetBtn>
            </>
          )}
          {/* 힐러일 때 나오는 모달 창 */}
          {nowPlayer === thisPlayer.username &&
          thisPlayer.charactorClass === "HEALER" ? (
            <TargetBtn disabled={disableHeal}>heal</TargetBtn>
          ) : (
            <></>
          )}
          {healCnt === true && (
            <div>
              <button
                onClick={actionTurnOverController}
                className={String(enemyPlayerB.playerId)}
              >
                {teamPlayer.username}
              </button>
              <button
                onClick={actionTurnOverController}
                className={String(enemyPlayerB.playerId)}
              >
                {enemyPlayerA.username}
              </button>
              <button
                onClick={actionTurnOverController}
                className={String(enemyPlayerB.playerId)}
              >
                {enemyPlayerB.username}
              </button>
            </div>
          )}
          {nowPlayer !== thisPlayer.username && (
            <>
              <TargetBtn onClick={sendUseCardHandler}>카드 사용하기</TargetBtn>
              <TargetBtn
                onClick={() =>
                  sendStompMsgFunc("1", thisPlayer.playerId, "ENDTURN", null)
                }
              >
                내 턴 종료하기
              </TargetBtn>
            </>
          )}
        </PlayerCtrlWrap>
      </div>
    </PlayerFieldWrap>
  );
};

export default PlayerField;
