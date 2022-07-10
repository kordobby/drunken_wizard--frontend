import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import { HeaderProps } from "../../../typings/typedb";
import { useAppSelector } from "../../../hooks/tsHooks";
const NoticeField = ({ status }: HeaderProps) => {
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayer);
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  return (
    <HeaderWrap>
      {status === "READY" && <h1>게임이 곧 시작됩니다.</h1>}
      {status === "GREETING" && <h1>내 직업을 확인하세요!</h1>}
      <h1>지금은 {status} 턴입니다.</h1>
      {status === "WAITING" && <h1>{nowPlayer}님이 플레이중입니다.</h1>}
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  height: 100px;
  background-color: #9c71e1;
  ${flex({ direction: "column", justify: "center", align: "center" })}
`;

export default NoticeField;
