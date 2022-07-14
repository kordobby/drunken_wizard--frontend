/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Interface */
import { HeaderProps } from "../../../typings/typedb";

/* CSS & SC */
import { HeaderWrap } from "../InGameStyled";

const NoticeField = ({ status }: HeaderProps) => {
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayer);
  const nowPlayerId = useAppSelector((state) => state.game.game.nowPlayerId);
  const thisPlayerId = useAppSelector(
    (state) => state.game.players.thisPlayer.playerId
  );

  return (
    <>
      <HeaderWrap>
        {status === "READY" && <h1>게임이 곧 시작됩니다.</h1>}
        {status === "GREETING" && <h1>내 직업을 확인하세요!</h1>}
        <h1>지금은 {status} 턴입니다.</h1>
        {status === "WAITING" && <h1>{nowPlayer}님이 플레이중입니다.</h1>}
      </HeaderWrap>
    </>
  );
};

export default NoticeField;
