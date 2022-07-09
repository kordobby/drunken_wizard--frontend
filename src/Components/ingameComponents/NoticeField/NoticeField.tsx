import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import { HeaderProps } from "../../../typings/typedb";
const NoticeField = ({ status, nowPlayer }: HeaderProps) => {
  return (
    <HeaderWrap>
      <h1>지금은 {status} 턴입니다.</h1>
      {nowPlayer && <span>{nowPlayer}님의 차례입니다.</span>}
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
