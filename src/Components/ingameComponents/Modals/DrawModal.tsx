import React from "react";
import { DrawModalWrap } from "../InGameStyled";
import DrawableCards from "./DrawableCards";
import { DrawProps } from "../../../typings/typedb";

const DrawModal = ({
  selectCardDrawTurnHandler,
  cancelCardDrawTurnHandler,
  selectTurnController,
  selectableCard,
  selectedCard,
  drawDisabled,
}: DrawProps) => {
  return (
    <DrawModalWrap>
      {selectableCard.map((value: any) => (
        <DrawableCards
          id={value.cardId}
          target={value.target}
          selectCardDrawTurnHandler={selectCardDrawTurnHandler}
          cancelCardDrawTurnHandler={cancelCardDrawTurnHandler}
          drawDisabled={drawDisabled}
        ></DrawableCards>
      ))}
      <span> 선택된 카드 {selectedCard}</span>
      <button onClick={selectTurnController}> 선택 완료하기</button>
    </DrawModalWrap>
  );
};

export default DrawModal;
