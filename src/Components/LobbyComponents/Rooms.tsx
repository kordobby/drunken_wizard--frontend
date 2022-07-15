import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
// stomp
import stompJS from "stompjs";
import { socket } from "../../shared/WebStomp";
// css
import flex from "../GlobalStyled/flex";
import team1 from "../../images/lobby/team1.jpg";
import team2 from "../../images/lobby/team2.jpg";
import noteam from "../../images/lobby/noteam.jpg";
import vs from "../../images/lobby/vs.svg";
// apis
import apis from "../../shared/api/apis";
import axios from "axios";
import { getCookie } from "../../shared/Cookies";
// interface
import { AddRoomType, joinRoomType } from "../../typings/db";

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
      type: "LEAVE",
      roomId: 1,
      sender: accessName,
      message: `${accessName}님이 채팅방에서 나갔습니다.`,
    };
    stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
  };

  const socketUnsubscribe = () => {
    try {
      stompClient
        .subscribe(`/sub/public`, function (data: any) {}, {})
        .unsubscribe();

      console.log("success to unsubscribe");
      pleaseMessage();
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>, room: string) => {
    socketUnsubscribe();
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
                  {room.userList[0] ? (
                    <Users style={{ backgroundImage: `url(${team1})` }}></Users>
                  ) : (
                    <Users
                      style={{ backgroundImage: `url(${noteam})` }}
                    ></Users>
                  )}

                  {room.userList[2] ? (
                    <Users style={{ backgroundImage: `url(${team1})` }}></Users>
                  ) : (
                    <Users
                      style={{ backgroundImage: `url(${noteam})` }}
                    ></Users>
                  )}
                </Team1>
                <img src={vs}></img>
                <Team2>
                  {room.userList[1] ? (
                    <Users style={{ backgroundImage: `url(${team2})` }}></Users>
                  ) : (
                    <Users
                      style={{ backgroundImage: `url(${noteam})` }}
                    ></Users>
                  )}
                  {room.userList[3] ? (
                    <Users style={{ backgroundImage: `url(${team2})` }}></Users>
                  ) : (
                    <Users
                      style={{ backgroundImage: `url(${noteam})` }}
                    ></Users>
                  )}
                </Team2>
                <ComeIn>
                  <span>입장하기</span>
                </ComeIn>
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
                <br />
                {room.userList[0] && <Users></Users>}
                {room.userList[2] && <Users></Users>}
                <br />

                <br />
                {room.userList[1] && (
                  <Users>
                    <span></span>
                  </Users>
                )}
                {room.userList[3] && (
                  <Users>
                    {/* <span>{room.userList[3].nickname}</span> */}
                  </Users>
                )}
                <Impossible>
                  <span>입장불가</span>
                </Impossible>
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
  width: 720px;
  height: 220px;
  background-color: #b68961;
  border-radius: 24px;
  margin: 10px;
  box-sizing: border-box;
  ${flex({ direction: "column" })};

  &:hover {
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

const RoomTitle = styled.div`
  width: 720px;
  height: 90px;
  box-sizing: border-box;
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
  width: 100%;
  height: 130px;
  ${flex};
`;
const Users = styled.div`
  width: 90px;
  height: 90px;
  margin: 0 5px;
  ${flex({ align: "center" })};
  border-radius: 45px;
  box-shadow: 5px 5px 5px 0.1px black;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const ComeIn = styled.div`
  width: 148px;
  height: 70px;
  margin: 0;
  span {
    color: white;
    font-size: 24px;
    font-weight: 1000;
    margin: auto;
  }

  ${flex({ align: "center" })};
  border-radius: 20px;
  background-color: #d6b27f;
  /* box-shadow: 5px 5px 5px 0.1px black inset; */
`;
const Impossible = styled.div`
  width: 148px;
  height: 70px;
  margin: 0;
  span {
    color: white;
    font-size: 24px;
    font-weight: 1000;
    margin: auto;
  }

  ${flex({ align: "center" })};
  border-radius: 20px;
  outline: 2px solid #d6b27f;
  outline-offset: -2px;
  background-color: #b68961;
  box-shadow: 5px 5px 5px 0.1px black inset;
`;

const Team1 = styled.div`
  width: 30%;
  height: 100%;
  margin: 0 0 0 15px;
  display: flex;
  align-items: center;
`;
const Team2 = styled.div`
  width: 30%;
  height: 100%;
  margin: 0 10px 0 10px;
  display: flex;
  align-items: center;
`;
