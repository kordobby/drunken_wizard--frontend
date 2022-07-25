/* Hooks */
import { useState } from "react";
import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/tsHooks";
import { PlayerFieldProps } from "../../../typings/typedb";
import { useParams } from "react-router-dom";
/* CSS & SC */
import { CraveWrap, CraveCards, Crave } from "../InGameStyled/InGameStyled";
import { DefaultBtnL } from "../../Common/CommonStyle";
const CraveField = ({ sendStompMsgFunc }: PlayerFieldProps) => {
  const actionTimer = useAppSelector((state) => state.game.game.status);
  const craveCards = useAppSelector((state) => state.game.game.cardCrave);
  const CardsSet = craveCards.slice(undefined, 3);
  const thisPlayer = useAppSelector(
    (state) => state.game.players.thisPlayer.playerId
  );
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayerId);
  const { roomId } = useParams();

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClicked(false);
    }, 3000);
  }, [clicked]);

  return (
    <>
      <CraveWrap>
        <Crave></Crave>
        {CardsSet.map((value) => (
          <CraveCards />
        ))}
        {actionTimer === "action" && nowPlayer === thisPlayer && (
          <DefaultBtnL
            disabled={clicked}
            onClick={() => {
              setClicked(true);
              sendStompMsgFunc(roomId, thisPlayer, "ENDTURN", null);
            }}
          >
            <span>턴 넘기기</span>
          </DefaultBtnL>
        )}
      </CraveWrap>
    </>
  );
};

export default CraveField;
