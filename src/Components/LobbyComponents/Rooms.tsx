import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// stomp
import stompJS from "stompjs";
import { socket } from "../../shared/WebStomp";
// css
import flex from "../GlobalStyled/flex";
// apis
import apis from "../../shared/api/apis";
import axios from "axios";
import { getCookie } from "../../shared/Cookies";
import { AddRoomType, joinRoomType } from "../../typings/db";
import { useEffect } from "react";

const joinRoomMT = (data: AddRoomType) => {
  const accessToken = getCookie("token");
  return axios.post(`http://13.124.63.214/game/${data.roomId}/join`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const Rooms = () => {
  const queryClient = useQueryClient();
  const stompClient = stompJS.over(socket);
  const navigate = useNavigate();

  const { data: roomList_query } = useQuery("room_list", apis.getRoomListQR, {
    onSuccess: (data: any) => {
      console.log(data);
      console.log("성공했어!");
    },
    onError: (error: any) => {
      console.log("실패", error);
    },
    // refetchInterval: 2000,
  });

  useEffect(() => {
    queryClient.invalidateQueries("room_list");
    console.log("확인용");
  }, []);

  // const { mutate: joinRoom } = useMutation(joinRoomMT, {
  //   onMutate: (res) => {
  //     // queryClient.invalidateQueries();
  //   },
  //   onSuccess: (res) => {
  //     console.log(res);
  //     queryClient.invalidateQueries("room_list");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     navigate("/lobby");
  //   },
  // });

  const pleaseMessage = () => {
    const accessName = getCookie("nickname");
    const data = {
      type: "JOIN",
      roomId: 1,
      sender: accessName,
      message: `${accessName}님이 채팅방에서 나갔습니다.`,
    };
    stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>, room: string) => {
    pleaseMessage();
    navigate(`/waiting/${room}`);
  };

  return (
    <RoomWrap>
      {roomList_query &&
        roomList_query.data.gameRoomList.map((room: any, i: any) => {
          return !room.userList[4] ? (
            // <Link
            //   key={i}
            //   to={`/waiting/${room.roomId}`}
            //   style={{ textDecoration: "none", color: "black" }}
            // >
            <RoomBox
              key={i}
              onClick={(e: any) => {
                onClick(e, room.roomId);
              }}
            >
              <RoomTitle>
                <RoomNumber>
                  <span>{i + 1}</span>
                </RoomNumber>

                <RoomName>{room?.roomName}</RoomName>
              </RoomTitle>
              <UsersWrap>
                <Team1>
                  {room.userList[0] && (
                    <Users>{room.userList[0].nickname}</Users>
                  )}

                  {room.userList[2] && (
                    <Users>{room.userList[2].nickname}</Users>
                  )}
                </Team1>
                <br />
                <Team2>
                  {room.userList[1] && (
                    <Users2>{room.userList[1].nickname}</Users2>
                  )}
                  {room.userList[3] && (
                    <Users2>{room.userList[3].nickname}</Users2>
                  )}
                </Team2>
              </UsersWrap>
            </RoomBox>
          ) : (
            // </Link>
            <RoomBox
              key={i}
              onClick={(e: any) => {
                onClick(e, room.roomId);
              }}
            >
              <RoomTitle>
                <RoomNumber>
                  <span>{i + 1}</span>
                </RoomNumber>
                <RoomName>{room?.roomName}</RoomName>
              </RoomTitle>
              <UsersWrap>
                <span>팀1</span>
                <br />
                {room.userList[0] && (
                  <Users>
                    <span>{room.userList[0].nickname}</span>
                  </Users>
                )}
                {room.userList[2] && (
                  <Users>
                    <span>{room.userList[2].nickname}</span>
                  </Users>
                )}
                <br />
                <span>팀2</span>
                <br />
                {room.userList[1] && (
                  <Users>
                    <span>{room.userList[1].nickname}</span>
                  </Users>
                )}
                {room.userList[3] && (
                  <Users>
                    <span>{room.userList[3].nickname}</span>
                  </Users>
                )}
              </UsersWrap>
            </RoomBox>
          );
        })}
    </RoomWrap>
  );
};

export default Rooms;

const RoomWrap = styled.div`
  width: 65vw;
  margin: 10px 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: top;
  box-sizing: border-box;
`;
const RoomBox = styled.div<joinRoomType>`
  width: 320px;
  height: 420px;
  background-color: #b68961;
  border-radius: 24px;
  margin: 10px;
  ${flex({ direction: "column" })};
`;

const RoomTitle = styled.div`
  width: 320px;
  height: 90px;
  border-radius: 24px 24px 0 0;
  background-color: #5d180a;
  ${flex}
  float: left;
`;
const RoomNumber = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 20px;
  border-radius: 28px;
  background-color: rgba(217, 217, 217, 1);
  box-shadow: 5px 5px 5px 0.1px gray inset;
  ${flex({ justify: "center" })};

  span {
    font-size: 36px;
    color: #5d180a;
  }
`;
const RoomName = styled.span`
  font-size: 36px;
  color: white;
  text-shadow: 1px 1px 5px black;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
`;

const UsersWrap = styled.div`
  width: 80%;
  height: 100%;
  ${flex({ direction: "column", justify: "center" })};
`;
const Users = styled.div`
  width: 168px;
  height: 58px;
  margin: 10px;
  padding-left: 10px;
  color: white;
  font-size: 24px;
  font-weight: 1000;
  ${flex({ align: "center" })};
  border-radius: 6px;
  background-color: #d6b27f;
  box-shadow: 5px 5px 5px 0.1px gray;
`;
const Users2 = styled.div`
  width: 168px;
  height: 58px;
  margin: 10px 0 0 75px;
  padding-left: 10px;
  color: white;
  font-size: 24px;
  font-weight: 1000;
  ${flex({ align: "center" })};
  border-radius: 6px;
  background-color: #d6b27f;
  box-shadow: 5px 5px 5px 0.1px gray;
`;

const Team1 = styled.div`
  width: 100%;
  height: 40%;
  margin: 10px 70px 5px 20px;
`;
const Team2 = styled.div`
  width: 100%;
  height: 40%;
  margin: 10px 20px 5px 70px;
`;
