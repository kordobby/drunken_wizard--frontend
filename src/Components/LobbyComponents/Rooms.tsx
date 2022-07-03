import React from "react";
import styled from "styled-components";
import flex from "../GlobalStyled/flex";
const Rooms = () => {
  return (
    <RoomWrap>
      <RoomTitle>
        <span>001</span>
        <span>방 제목</span>
      </RoomTitle>
      <UsersWrap>
        <Users>닉네임 1</Users>
        <Users>닉네임 2</Users>
        <Users>닉네임 3</Users>
        <Users>닉네임 4</Users>
      </UsersWrap>
    </RoomWrap>
  );
};

export default Rooms;

const RoomWrap = styled.div`
  width: 300px;
  height: 200px;
  background-color: whitesmoke;
  ${flex({ direction: "column" })};
`;

const RoomTitle = styled.div`
  width: 80%;
  height: 20%;
  ${flex({ justify: "space-between" })}
`;

const UsersWrap = styled.div`
  width: 80%;
  height: 100%;
  ${flex({ direction: "column" })};
`;
const Users = styled.div`
  width: 80%;
  height: 15%;
  margin: 5px;
  background-color: antiquewhite;
`;
