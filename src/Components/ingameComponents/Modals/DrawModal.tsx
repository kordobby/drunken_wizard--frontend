import { useEffect, useState } from "react";
/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";
import { useParams } from "react-router-dom";

/* Modules */
import { DrawProps } from "../../../typings/typedb";

/* CSS & SC */
import {
  DrawModalWrap,
  DrawableCardsWrap,
  NoticeIcon,
  DrawModalHeader,
  PurpleConfirmBtn,
} from "../InGameStyled/InGameStyled";
import DrawableCards from "./DrawableCards";
import { StModalWrap } from "../../../elem/TwoBtnModal";
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
  const Cardss = [
    {
      cardId: 1,
      target: "SELECT",
      description: "hello",
      manaCost: 2,
      cardName: "Venom",
    },
    {
      cardId: 2,
      target: "SELECT",
      description: "hello",
      manaCost: 2,
      cardName: "Panacea",
    },
  ];
  return (
    <StModalWrap>
      <DrawModalWrap>
        <DrawModalHeader>
          <NoticeIcon>!</NoticeIcon>
          <span>
            앞으로 {selectableCnt - removeDupSelectedCard.length}장 더 선택
            가능합니다.
          </span>
        </DrawModalHeader>
        <DrawableCardsWrap>
          {/* selectableCards */}
          {Cardss?.map((value: any) => (
            <DrawableCards
              key={value.cardId}
              drawDisabled={drawDisabled}
              value={value}
            ></DrawableCards>
          ))}
        </DrawableCardsWrap>
        <PurpleConfirmBtn onClick={sendDrawCardsHandler}>확인</PurpleConfirmBtn>
      </DrawModalWrap>
    </StModalWrap>
  );
};

export default DrawModal;
