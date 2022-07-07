import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
// css
import flex from "../GlobalStyled/flex";

const getRoomListQR = () => {
  return axios.get(`http://3.35.53.184/chat/game/rooms`);
};

const Rooms = () => {
  const { data: roomList_query } = useQuery("room_list", getRoomListQR, {
    onSuccess: (data: any) => {
      console.log("성공했어!");
    },
    onError: (error: any) => {
      console.log("실패", error);
    },
  });
  // console.log(roomList_query);

  return (
    <>
      {roomList_query &&
        roomList_query.data.map((room: any, i: any) => {
          return (
            room.userList.length > 0 && (
              <Link
                to={`/waiting/${room.roomId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <RoomWrap>
                  <RoomTitle>
                    <span>{i + 1}</span>
                    <span>{room?.roomName}</span>
                  </RoomTitle>
                  <UsersWrap>
                    <span>팀1</span>
                    <br />
                    {room.userList[0] && <Users>닉네임 1</Users>}
                    {room.userList[2] && <Users>닉네임 3</Users>}
                    <br />
                    <span>팀2</span>
                    <br />
                    {room.userList[1] && <Users>닉네임 2</Users>}
                    {room.userList[3] && <Users>닉네임 4</Users>}
                  </UsersWrap>
                </RoomWrap>
              </Link>
            )
          );
        })}
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
