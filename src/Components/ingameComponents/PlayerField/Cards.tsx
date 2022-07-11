/* Interface */
import { CardProps } from "../../../typings/typedb";

/* CSS & SC */
import { ScCardsWrap } from "../InGameStyled";

const Cards = ({
  id,
  className,
  name,
  selectUseCardHandler,
  selectDisCardHandler,
}: CardProps) => {
  return (
    <ScCardsWrap>
      <span>cardId: {name}</span>
      <span>target: {className}</span>
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
