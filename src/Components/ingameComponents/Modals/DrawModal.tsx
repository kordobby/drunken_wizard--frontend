import React, { useEffect } from "react";
import { DrawModalWrap, DrawableCardsWrap } from "../InGameStyled";
import DrawableCards from "./DrawableCards";
import { DrawProps } from "../../../typings/typedb";
import { useAppSelector } from "../../../hooks/tsHooks";
import { useState } from "react";
const DrawModal = ({
  selectTurnController,
  selectedCard,
  drawDisabled,
  setSelectedCard,
}: DrawProps) => {
  const thisPlayer = useAppSelector(
    (state) => state.game.players.thisPlayer.charactorClass
  );
  const selectableCards = useAppSelector(
    (state) => state.game.game.selectableCards
  );

  console.log(selectableCards);
  return (
    <DrawModalWrap>
      {thisPlayer === "FARSEER" ? (
        <div>
          <p>당신은 미래를 보는 파시어입니다.</p>
          <p>원하는 카드 두장을 선택하세요.</p>
          <p>선택하지 않은 카드는 카드 덱으로 돌아갑니다.</p>
        </div>
      ) : (
        <p>드로우할 카드를 선택하세요.</p>
      )}
      <DrawableCardsWrap>
        {selectableCards?.map((value: any) => (
          <DrawableCards
            key={value.cardId}
            id={value.cardId}
            target={value.target}
            drawDisabled={drawDisabled}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
          ></DrawableCards>
        ))}
      </DrawableCardsWrap>
      {/* <span> 선택된 카드 {selectedCard}</span> */}
      <button onClick={selectTurnController}> 선택 완료하기</button>
    </DrawModalWrap>
  );
};

export default DrawModal;
