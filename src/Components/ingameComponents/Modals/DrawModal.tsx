import { useEffect, useState } from "react";
/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";
import { useParams } from "react-router-dom";

/* Modules */
import { DrawProps } from "../../../typings/typedb";

/* CSS & SC */
import { DrawModalWrap, DrawableCardsWrap } from "../InGameStyled";
import DrawableCards from "./DrawableCards";

const DrawModal = ({ sendStompMsgFunc }: DrawProps) => {
  const [drawDisabled, setDrawDisabled] = useState<boolean>(false);

  const { roomId } = useParams();
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const selectableCnt = useAppSelector(
    (state) => state.game.game.selectableCnt
  );
  console.log(selectableCnt);
  const selectableCards = useAppSelector(
    (state) => state.game.game.selectableCards
  );
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
    const data = { selectedCards: removeDupSelectedCard };
    sendStompMsgFunc(roomId, thisPlayer.playerId, "SELECT", data);
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
