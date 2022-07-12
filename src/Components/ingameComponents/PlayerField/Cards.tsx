/* Interface */
import { CardProps } from "../../../typings/typedb";

/* CSS & SC */
import { ScCardsWrap } from "../InGameStyled";

import { useAppSelector } from "../../../hooks/tsHooks";

const Cards = ({
  id,
  className,
  name,
  selectUseCardHandler,
  selectDisCardHandler,
}: CardProps) => {
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  return (
    <>
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
    </>
  );
};

export default Cards;
