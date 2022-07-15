// import { useState } from "react";

// /* Hooks */
// import { useAppSelector } from "../../../hooks/tsHooks";

// /* Cookies */
// import { getCookie } from "../../../shared/Cookies";

// /* Interface */
// import { CardProps } from "../../../typings/typedb";

// /* CSS & SC */
// import { ScCardsWrap } from "../InGameStyled";

// const Cards = ({ value }: CardProps) => {
//   const [selected, setSelected] = useState(false);
//   const myId = getCookie("id");
//   const nowPlayer = useAppSelector((state) => state.game.game.nowPlayerId);

//   return (
//     <>
//       <ScCardsWrap selected={selected} value={value}>
//         <span>cardId: {value.cardName}</span>
//         <span>target: {value.target}</span>
//         {Number(myId) === Number(nowPlayer) && (
//           <>
//             <button>선택</button>
//             <button>버리기</button>
//           </>
//         )}
//       </ScCardsWrap>
//     </>
//   );
// };

// export default Cards;
