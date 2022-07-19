import { useEffect, useState } from "react";
/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Modules */
import { DrawProps } from "../../../typings/typedb";

/* CSS & SC */
import { DrawModalWrap, DrawableCardsWrap } from "../InGameStyled";
import DrawableCards from "./DrawableCards";

const DrawModal = ({ sendStompMsgFunc }: DrawProps) => {
  const [drawDisabled, setDrawDisabled] = useState<boolean>(false);

  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const selectableCnt = useAppSelector(
    (state) => state.game.game.selectableCnt
  );
  console.log(selectableCnt);
  const selectableCards = useAppSelector(
    (state) => state.game.game.selectableCards
  );
  console.log(selectableCards);
  console.log(selectableCards);
  const selectedCardsArr = useAppSelector(
    (state) => state.game.game.drawSelectCards
  );
  const removeDupSelectedCard = selectedCardsArr.filter(
    (value, index) => selectedCardsArr.indexOf(value) === index
  );

  useEffect(() => {
    if (selectableCnt === removeDupSelectedCard.length) {
      setDrawDisabled(true);
    } else {
      setDrawDisabled(false);
    }
  }, [removeDupSelectedCard]);

  const sendDrawCardsHandler = () => {
    console.log("렌더링 테스트: Draw Modal Component");
    const data = { selectedCards: removeDupSelectedCard };
    sendStompMsgFunc("1", thisPlayer.playerId, "SELECT", data);
  };
  return (
    <DrawModalWrap>
      <DrawableCardsWrap>
        {selectableCards?.map((value: any) => (
          <DrawableCards
            key={value.cardId}
            drawDisabled={drawDisabled}
            value={value}
          ></DrawableCards>
        ))}
      </DrawableCardsWrap>
      <button onClick={sendDrawCardsHandler}> 선택 완료하기</button>
    </DrawModalWrap>
  );
};

export default DrawModal;
