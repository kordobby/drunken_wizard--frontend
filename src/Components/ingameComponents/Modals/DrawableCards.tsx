import { useState } from "react";

/* Interface */
import { DrawCardsProps } from "../../../typings/typedb";

/* CSS & SC */
import { DrawbleCardWrap } from "../InGameStyled";

import { useAppSelector } from "../../../hooks/tsHooks";
const DrawableCards: React.FC<DrawCardsProps> = ({
  id,
  target,
  drawDisabled,
  setSelectedCard,
  selectedCard,
}) => {
  const [selected, setSelected] = useState(false);
  const thisPlayer = useAppSelector(
    (state) => state.game.players.thisPlayer.charactorClass
  );
  /* DRAW :: SELECT <==> CANCEL */
  const selectCardHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selected === false && drawDisabled === false) {
      console.log("클릭감지1");
      const newSelectedCard: any[] = [...selectedCard];
      const targetId = (event.target as HTMLDivElement).id;
      console.log(targetId);
      if (targetId === null || undefined) {
        alert("꽝카드!");
        return;
      } else {
        const setNew = newSelectedCard.push(targetId);
        const removeDup = newSelectedCard.filter(
          (value, index) => newSelectedCard.indexOf(value) === index
        );
        setSelected(true);
        setSelectedCard(removeDup);
      }
    } else if (selected === false && drawDisabled === true) {
      alert("선택가능한 카드수를 초과했습니다!");
    } else if (selected === true) {
      console.log("클릭감지2");
      const newSelectedCard = [...selectedCard];
      const target = (event.target as HTMLDivElement).id;
      console.log(target);
      const setNew = newSelectedCard.filter(
        (value) => Number(value) !== Number(target)
      );
      setSelected(false);
      setSelectedCard(setNew);
    }
  };
  const selectCardBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (selected === false && drawDisabled === false) {
      console.log("클릭감지1");
      const newSelectedCard: any[] = [...selectedCard];
      const targetId = (event.target as HTMLButtonElement).id;
      console.log(targetId);
      if (targetId === "" || null || undefined) {
        alert("꽝카드!");
        return;
      } else {
        const setNew = newSelectedCard.push(targetId);
        const removeDup = newSelectedCard.filter(
          (value, index) => newSelectedCard.indexOf(value) === index
        );
        setSelected(true);
        setSelectedCard(removeDup);
      }
    } else if (selected === false && drawDisabled === true) {
      alert("선택가능한 카드수를 초과했습니다!");
    } else if (selected === true) {
      console.log("클릭감지2");
      const newSelectedCard = [...selectedCard];
      const target = (event.target as HTMLButtonElement).id;
      console.log(target);
      const setNew = newSelectedCard.filter(
        (value) => Number(value) !== Number(target)
      );
      setSelected(false);
      setSelectedCard(setNew);
    }
  };
  return (
    <>
      {thisPlayer === "FARSEER" ? (
        <DrawbleCardWrap
          selected={selected}
          id={String(id)}
          className={target}
          onClick={selectCardHandler}
        >
          <button id={String(id)} onClick={selectCardBtn}>
            선택
          </button>
          <span>cardId: </span>
        </DrawbleCardWrap>
      ) : (
        <DrawbleCardWrap
          selected={selected}
          id={String(id)}
          className={target}
          onClick={selectCardHandler}
        >
          <button id={String(id)} onClick={selectCardBtn}>
            선택
          </button>
          <span>뭘까요?</span>
        </DrawbleCardWrap>
      )}
    </>
  );
};

export default DrawableCards;
