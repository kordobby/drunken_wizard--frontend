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
import { DrawableCard } from "../InGameStyled";

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
    console.log(cardMaker);
    if (selected === false && drawDisabled === false) {
      console.log("추가");
      dispatch(setDrawCardSelectTK(cardMaker));
      setSelected(true);
    } else if (selected === false && drawDisabled === true) {
      alert("선택가능한 카드수를 초과했습니다!");
    } else if (selected === true) {
      console.log("제거");
      dispatch(cancelSelectDrawCardsTK(cardMaker));
      setSelected(false);
    }
  };

  return (
    <>
      {thisPlayer === "FARSEER" ? (
        <DrawableCard
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            selectCardHandler(event, value);
          }}
          selected={selected}
          cardId={0}
        >
          <p>나와라 얍</p>
        </DrawableCard>
      ) : (
        <DrawableCard
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            selectCardHandler(event, value);
          }}
          selected={selected}
          cardId={value.cardId}
        >
          <p>나와라 얍</p>
        </DrawableCard>
      )}
    </>
  );
};

export default DrawableCards;
