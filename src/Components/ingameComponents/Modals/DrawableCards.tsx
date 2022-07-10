import { DrawbleCardWrap } from "../InGameStyled";
import { DrawCardsProps } from "../../../typings/typedb";

const DrawableCards: React.FC<DrawCardsProps> = ({
  id,
  target,
  selectCardDrawTurnHandler,
  cancelCardDrawTurnHandler,
  drawDisabled,
}) => {
  return (
    <DrawbleCardWrap>
      <span>cardId: </span>
      <button
        id={String(id)}
        className={target}
        onClick={selectCardDrawTurnHandler}
        disabled={drawDisabled}
      >
        선택
      </button>
      <button id={String(id)} onClick={cancelCardDrawTurnHandler}>
        취소
      </button>
    </DrawbleCardWrap>
  );
};

export default DrawableCards;
