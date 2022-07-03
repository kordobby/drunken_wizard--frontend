import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
// css
import flex from "../GlobalStyled/flex";

const getRoomListQR = () => {
  return axios.get(`http://3.35.214.100/rooms`);
};

const Rooms = () => {
  const roomList_query = useQuery("room_list", getRoomListQR, {
    onSuccess: (data: any) => {
      console.log("성공했어!", data);
    },
    onError: (error: any) => {
      console.log("실패", error);
    },
  });

  return (
    <>
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
    </>
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
