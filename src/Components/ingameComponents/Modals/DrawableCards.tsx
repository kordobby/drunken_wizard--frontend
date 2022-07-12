import { useState } from "react";

/* Interface */
import { DrawCardsProps } from "../../../typings/typedb";

/* CSS & SC */
import { DrawbleCardWrap } from "../InGameStyled";

const DrawableCards: React.FC<DrawCardsProps> = ({
  id,
  target,
  drawDisabled,
  setSelectedCard,
  selectedCard,
}) => {
  const [selected, setSelected] = useState(false);

  /* DRAW :: SELECT <==> CANCEL */
  const selectCardHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("클릭감지");
    console.log(selected);
    console.log(drawDisabled);
    if (selected === false && drawDisabled === false) {
      console.log("클릭감지1");
      const newSelectedCard: any[] = [...selectedCard];
      const targetId = (event.target as HTMLDivElement).id;
      const setNew = newSelectedCard.push(targetId);
      const removeDup = newSelectedCard.filter(
        (value, index) => newSelectedCard.indexOf(value) === index
      );
      setSelected(true);
      setSelectedCard(removeDup);
    } else if (selected === false && drawDisabled === true) {
      alert("선택가능한 카드수를 초과했습니다!");
    } else if (selected === true) {
      console.log("클릭감지2");
      const newSelectedCard = [...selectedCard];
      const target = (event.target as HTMLButtonElement).id;
      const setNew = newSelectedCard.filter(
        (value) => Number(value) !== Number(target)
      );
      setSelected(false);
      setSelectedCard(setNew);
    }
  };

  console.log(selectedCard);
  return (
    <DrawbleCardWrap
      selected={selected}
      id={String(id)}
      className={target}
      onClick={selectCardHandler}
    >
      <span>cardId: </span>
      {/* <button
        id={String(id)}
        className={target}
        onClick={selectCardDrawTurnHandler}
        disabled={drawDisabled}
      >
        선택
      </button>
      <button id={String(id)} onClick={cancelCardDrawTurnHandler}>
        취소
      </button> */}
    </DrawbleCardWrap>
  );
};

export default DrawableCards;
