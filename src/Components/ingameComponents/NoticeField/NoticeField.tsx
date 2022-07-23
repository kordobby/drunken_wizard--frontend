/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Interface */
import { HeaderProps } from "../../../typings/typedb";

/* CSS & SC */
import { HeaderWrap } from "../InGameStyled";
// import LogoutBtn from "../../../elem/Button";
const NoticeField = ({ status }: HeaderProps) => {
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayer);
  const thisPlayer = useAppSelector(
    (state) => state.game.players.thisPlayer.username
  );
  const order = useAppSelector((state) => state.game.game.order);
  return (
    <>
      <HeaderWrap>
        {/* <LogoutBtn /> */}
        {status === "" && <span>waiting for players...</span>}
        {status !== "" && (
          <h1>
            {order[0]} - {order[1]} - {order[2]} - {order[3]}
          </h1>
        )}
        {/* If not my TURN */}
        {nowPlayer !== thisPlayer && status === "ACTION" && (
          <h1>{nowPlayer} 님이 게임을 플레이하고 있습니다.</h1>
        )}
        {nowPlayer !== thisPlayer && status === "DRAW" && (
          <h1>{nowPlayer} 님이 게임을 카드를 드로우합니다.</h1>
        )}
        {nowPlayer !== thisPlayer && status === "ACTIONFAILED" && (
          <h1>
            {nowPlayer} 님이 상태이상으로 인해 게임을 진행할 수 없어 다음턴으로
            넘어갑니다.
          </h1>
        )}
        {nowPlayer !== thisPlayer && status === "WAITING" && (
          <h1>{nowPlayer} 님이 곧 게임을 시작합니다.</h1>
        )}
        {/* If my TURN */}
        {nowPlayer === thisPlayer && status === "DRAW" && (
          <h1>10초 안에 카드를 드로우하세요!</h1>
        )}
        {nowPlayer === thisPlayer &&
          status ===
            ("ACTION" || "USECARD" || "USECARDSUCCESS" || "DISCARD") && (
            <h1>30초 안에 플레이를 진행해주세요!</h1>
          )}
        {nowPlayer === thisPlayer && status === "ACTIONFAILED" && (
          <h1>
            상태이상으로 인해 게임을 진행할 수 없어 다음턴으로 넘어갑니다.
          </h1>
        )}
        {nowPlayer === thisPlayer && status === "CHANGETURN" && (
          <h1>턴이 종료되었습니다.</h1>
        )}
      </HeaderWrap>
    </>
  );
};

export default NoticeField;
