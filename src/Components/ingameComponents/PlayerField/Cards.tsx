import { useState } from "react";

/* Interface */
import { CardProps } from "../../../typings/typedb";

/* CSS & SC */
import { ScCardsWrap } from "../InGameStyled";

import { useAppSelector } from "../../../hooks/tsHooks";
import { getCookie } from "../../../Shared/Cookies";
const Cards = ({
  id,
  className,
  name,
  selectUseCardHandler,
  selectDisCardHandler,
}: CardProps) => {
  const myId = getCookie("id");
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayerId);

  return (
    <>
      <ScCardsWrap>
        <span>cardId: {name}</span>
        <span>target: {className}</span>
        {Number(myId) === Number(nowPlayer) && (
          <>
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
          </>
        )}
      </ScCardsWrap>
    </>
  );
};

export default Cards;
