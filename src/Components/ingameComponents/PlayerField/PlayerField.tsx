import React, { FunctionComponent } from "react";
import { PlayerFieldWrap } from "../InGameStyled";
import { CardsArea, PlayerCtrlWrap } from "../InGameStyled";
import Cards from "./Cards";
import { PlayerProps } from "../../../typings/typedb";

const PlayerField: FunctionComponent<PlayerProps> = ({
  myCards,
  findTargetGroup,
  selectUseCardHandler,
  sendUseCardHandler,
  selectDisCardHandler,
  enemyPlayerA,
  enemyPlayerB,
  teamPlayer,
  thisPlayer,
  setSelectTarget,
  sendStompMsg,
}) => {
  const confirmTargetHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = (event.target as HTMLButtonElement).className;
    setSelectTarget(targetId);
    console.log(targetId);
    //event.target.id
  };

  return (
    <PlayerFieldWrap>
      <CardsArea>
        {myCards.map((value: any) => (
          <Cards
            key={value.cardId}
            id={value.cardId}
            className={value.target}
            selectUseCardHandler={selectUseCardHandler}
            selectDisCardHandler={selectDisCardHandler}
          ></Cards>
        ))}
      </CardsArea>
      <PlayerCtrlWrap>
        {findTargetGroup === "ME" && (
          <button onClick={confirmTargetHandler} className={String(thisPlayer)}>
            {thisPlayer}
          </button>
        )}
        {findTargetGroup === "SELECT" && (
          <>
            <button
              onClick={confirmTargetHandler}
              className={String(enemyPlayerA)}
            >
              {enemyPlayerA}
            </button>
            <button
              onClick={confirmTargetHandler}
              className={String(enemyPlayerB)}
            >
              {enemyPlayerB}
            </button>
          </>
        )}
        <button onClick={sendUseCardHandler}>카드 사용하기</button>
        <button onClick={() => sendStompMsg("ENDTURN")}>내 턴 종료하기</button>
      </PlayerCtrlWrap>
    </PlayerFieldWrap>
  );
};

export default PlayerField;
