import { useState } from "react";
/* Hooks */
import { useAppDispatch, useAppSelector } from "../../../hooks/tsHooks";

/* Interface */
import { Card, DrawableCardsProps } from "../../../typings/typedb";

/* modules */
import {
  setDrawCardSelectTK,
  cancelSelectDrawCardsTK,
} from "../../../redux/modules/ingameSlice";

/* CSS & SC */
import { DrawableCard } from "../InGameStyled/InGameStyled";
import AlertPopUp from "../InGameCommon/AlertPopUp";
const DrawableCards = ({ value, drawDisabled }: DrawableCardsProps) => {
  const [selected, setSelected] = useState(false);

  // find 파시어
  const dispatch = useAppDispatch();
  const thisPlayer = useAppSelector(
    (state) => state.game.players.thisPlayer.charactorClass
  );

  /* DRAW :: SELECT <==> CANCEL */
  const selectCardHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    value: Card
  ) => {
    const cardMaker = {
      cardId: value.cardId,
    };
    if (selected === false && drawDisabled === false) {
      dispatch(setDrawCardSelectTK(cardMaker));
      setSelected(true);
    } else if (selected === false && drawDisabled === true) {
      setSelectOver(true);
      setTimeout(() => {
        setSelectOver(false);
      }, 1000);
    } else if (selected === true) {
      dispatch(cancelSelectDrawCardsTK(cardMaker));
      setSelected(false);
    }
  };
  const [selectOver, setSelectOver] = useState(false);
  return (
    <>
      {selectOver && (
        <AlertPopUp
          upperText="선택가능한"
          middleText="카드 수를 초과했어요!"
          bottomText=""
        />
      )}
      {thisPlayer === "FARSEER" ? (
        <DrawableCard
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            selectCardHandler(event, value);
          }}
          selected={selected}
          cardName={value.cardName}
        ></DrawableCard>
      ) : (
        <DrawableCard
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            selectCardHandler(event, value);
          }}
          selected={selected}
          cardName="flipped"
        ></DrawableCard>
      )}
    </>
  );
};

export default DrawableCards;
