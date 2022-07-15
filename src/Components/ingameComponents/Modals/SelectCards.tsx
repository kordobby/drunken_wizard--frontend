// import { FunctionComponent, useState } from "react";
// import styled from "styled-components";
// import flex from "../../GlobalStyled/flex";
// import { UseCardProps, SampleCardProps } from "../../../typings/typedb";
// import { useAppSelector, useAppDispatch } from "../../../hooks/tsHooks";
// import {
//   setDrawCardSelectTK,
//   cancelSelectDrawCardsTK,
// } from "../../../redux/modules/ingameSlice";

// const SelectCards = ({ value, className }: UseCardProps) => {
//   const [selected, setSelected] = useState(false);
//   const [target, setTarget] = useState(0); // 마우스오버 된 대상
//   const [mouseIn, setMouseIn] = useState(false); // 모든 컴포넌트에서 마우스 오버 여부 확인

//   const dispatch = useAppDispatch();
//   const selectedCard = useAppSelector(
//     (state) => state.game.game.drawSelectCards
//   );
//   console.log(selectedCard);
//   const removeDup = selectedCard.filter(
//     (value, index) => selectedCard.indexOf(value) === index
//   );

//   const onMouseOverEvent = (
//     event: React.MouseEvent<HTMLDivElement>,
//     value: number
//   ) => {
//     setTarget(value); // 마우스를 오버했을 때 해당 item의 값으로 target 변경
//     setMouseIn(Boolean(event)); // 마우스 오버 확인
//     //console.log(Boolean(event))
//   };

//   const onMouseLeaverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
//     setTarget(0); // 마우스가 나왔을 떄 타켓 제거
//     setMouseIn(!event);
//     console.log(!event); // 마우스 나왔을 때 확인
//   };

//   // 상태값을 바탕으로 클래스를 생성합니다.
//   const generateClassName = (
//     target: number,
//     itemValue: number,
//     isMouseIn: boolean
//   ) => {
//     if (itemValue === target && isMouseIn) {
//       return "active";
//     }

//     if (itemValue === target || mouseIn) {
//       return "normal";
//     }

//     return "default";
//   };

//   // const sendHealMsgHandler = (
//   //   event: React.MouseEvent<HTMLDivElement>,
//   //   value: Card
//   // ) => {
//   //   const cardMaker = {
//   //     cardId: value.cardId,
//   //   };
//   //   console.log(cardMaker);
//   //   if (selected === false) {
//   //     console.log("추가");
//   //     dispatch(setDrawCardSelectTK(cardMaker));
//   //     setSelected(true);
//   //   } else {
//   //     console.log("제거");
//   //     dispatch(cancelSelectDrawCardsTK(cardMaker));
//   //     setSelected(false);
//   //   }
//   // };

//   return (
//     <CardSample
//       value={value}
//       // onClick={(event) => {
//       //   sendHealMsgHandler(event, value);
//       // }}
//       // onMouseOver={(event) => {
//       //   onMouseOverEvent(event, value);
//       // }}
//       className={className}
//     >
//       <TargetBtn>hello</TargetBtn>
//       <TargetBtn>hello</TargetBtn>
//     </CardSample>
//   );
// };

// const TargetBtn = styled.button`
//   width: 50px;
//   height: 50px;
// `;

// export default SelectCards;

// const CardSample = styled.div<SampleCardProps>`
//   height: 160px;
//   width: 120px;
//   .active {
//     background-color: blue;
//   }

//   .normal {
//     background: red;
//     transform: scale(0.8);
//   }
//   .default {
//     background: yellow;
//   }
//   transition: all 100ms ease-in-out;
// `;
