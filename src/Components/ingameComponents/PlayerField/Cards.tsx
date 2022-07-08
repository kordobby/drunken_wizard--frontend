import { ScCardsWrap } from "../InGameStyled";
import { CardProps } from "../../../typings/typedb";

const Cards = ({
  id,
  className,
  selectUseCardHandler,
  selectDisCardHandler,
}: CardProps) => {
  return (
    <ScCardsWrap>
      <span>cardId:</span>
      <span>target:</span>
      <button
        id={String(id)}
        className={className}
        onClick={selectUseCardHandler}
      >
        선택
      </button>
      <button
        id={String(id)}
        className={className}
        onClick={selectDisCardHandler}
      >
        버리기
      </button>
    </ScCardsWrap>
  );
};

export default Cards;
