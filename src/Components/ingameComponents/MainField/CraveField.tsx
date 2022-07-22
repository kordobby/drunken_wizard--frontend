/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";
import { PlayerFieldProps } from "../../../typings/typedb";
import { useParams } from "react-router-dom";
/* CSS & SC */
import { CraveWrap, CraveCards, Crave } from "../InGameStyled";
import { DefaultBtnL } from "../../Common/CommonStyle";
const CraveField = ({ sendStompMsgFunc }: PlayerFieldProps) => {
  // const Crave = useAppSelector((state) => state.game.game.cardCrave);
  const thisPlayer = useAppSelector(
    (state) => state.game.players.thisPlayer.playerId
  );
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayerId);
  const { roomid } = useParams<{ roomid?: string }>();
  return (
    <>
      <CraveWrap>
        <Crave></Crave>
        <CraveCards></CraveCards>
        <CraveCards></CraveCards>
        <DefaultBtnL
          disabled={nowPlayer === thisPlayer}
          onClick={() => {
            sendStompMsgFunc(roomid, thisPlayer, "ENDTURN", null);
          }}
        >
          <span>턴 넘기기</span>
        </DefaultBtnL>
      </CraveWrap>
    </>
  );
};

export default CraveField;
