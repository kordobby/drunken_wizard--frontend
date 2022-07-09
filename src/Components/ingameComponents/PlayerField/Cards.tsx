import { ScCardsWrap } from "../InGameStyled";
import { CardProps } from "../../../typings/typedb";

const Cards = ({
  id,
  className,
  name,
  selectUseCardHandler,
  selectDisCardHandler,
}: CardProps) => {
  return (
    <ScCardsWrap>
      <span>cardId:</span>
      <span>target:</span>
      <button
        id={String(id)}
        name={name}
        className={className}
        onClick={selectUseCardHandler}
      >
        선택
      </button>
      <button
        id={String(id)}
        className={className}
        name={name}
        onClick={selectDisCardHandler}
      >
        버리기
      </button>
    </ScCardsWrap>
  );
};

export default Cards;