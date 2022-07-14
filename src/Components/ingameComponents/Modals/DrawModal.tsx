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
    sendStompMsgFunc("1", thisPlayer.playerId, "SELECT", data);
  };
  return (
    <DrawModalWrap>
      {thisPlayer.charactorClass === "FARSEER" ? (
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
