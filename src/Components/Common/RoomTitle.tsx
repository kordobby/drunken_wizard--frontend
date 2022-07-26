import styled from "styled-components";
import flex from "../GlobalStyled/flex";

const RoomTitle = () => {
  return (
    <RoomTitleSt>
      <span className="room__title">방이름여깃다</span>
    </RoomTitleSt>
  );
};

export default RoomTitle;

const RoomTitleSt = styled.div`
  width: 71.354vw;
  height: 3.854vw;
  background-color: #564d4d;
  color: var(--white);
  font-size: 1.875vmax;
  margin-left: 1.55vw;
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
