import styled from "styled-components";
import { HeaderTitleProps } from "../../typings/typedb";
import flex from "../GlobalStyled/flex";

const HeaderRoomTitle = ({ text }: HeaderTitleProps) => {
  return (
    <RoomTitleSt>
      <span className="room__title">{text}</span>
    </RoomTitleSt>
  );
};

export default HeaderRoomTitle;

const RoomTitleSt = styled.div`
  width: 71.354vw;
  height: 3.854vw;
  margin-left: 1.35vw;
  background-color: #564d4d;
  color: var(--white);
  font-size: 1.875vmax;
  border-radius: 0.55vh;
  border: none;
  font-family: "국립박물관문화재단클래식B";
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
  ${flex({ justify: "center", align: "center" })};
  .room__title {
    background-color: #ffffff;
    color: transparent;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    /* box-shadow: 0px 0px 10px 2px #fd6f33; */
  }
`;
