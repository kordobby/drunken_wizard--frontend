import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
// stomp
import stompJS from "stompjs";
import { socket } from "../../shared/WebStomp";
// apis
import apis from "../../shared/api/apis";
// hooks
import { getCookie } from "../../shared/Cookies";
// css
import {
  ComeIn,
  NextButton,
  PageButtonBox,
  PrevButton,
  RoomBox,
  RoomBoxWrap,
  RoomName,
  RoomNumber,
  RoomTitle,
  RoomUsers,
  RoomWrap,
  Team1,
  Team2,
  UsersWrap,
  XBox,
  XImg,
} from "./LobbyStyled";
// imgs
import team1 from "../../images/lobby/team1.jpg";
import team2 from "../../images/lobby/team2.jpg";
import noteam from "../../images/lobby/noteam.jpg";
import vs from "../../images/lobby/vs.svg";
import x from "../../images/lobby/x.svg";
import right from "../../images/buttons/BTN_right.svg";
import rightend from "../../images/buttons/BTN_rightend.svg";
import left from "../../images/buttons/BTN_left.svg";
import leftend from "../../images/buttons/BTN_leftend.svg";
import { DefaultBtn } from "../Common/CommonStyle";

const Rooms = () => {
  const queryClient = useQueryClient();
  const stompClient = stompJS.over(socket);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const accessId = getCookie("id");

  // query
  const { data: roomList_query } = useQuery(
    ["room_list", { page }],
    () => apis.getRoomListQR(page),
    {
      onSuccess: (data: any) => {
        console.log(data);
        console.log("성공했어!");
      },
      onError: (error: any) => {
        console.log("실패", error);
      },
      keepPreviousData: true,
      // refetchInterval: 2000,
    }
  );

  // mutate
  const { mutate: joinRoom } = useMutation(apis.joinRoomMT, {
    onSuccess: (res) => {
      if (res.data.joinSuccess) {
        navigate(`/waiting/${res.data.roomId}`);
        socketUnsubscribe();
        queryClient.invalidateQueries(["room_list"]);
      }
    },
    onError: (error) => {
      console.log(error);
      navigate("/lobby");
    },
  });

  const leaveMessage = () => {
    const accessId = getCookie("id");
    const accessName = getCookie("nickname");
    const data = {
      type: "LEAVE",
      sender: accessId,
      nickname: accessName,
      message: `${accessName}님이 채팅방에서 나갔습니다.`,
    };
    stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
  };

  const socketUnsubscribe = () => {
    try {
      stompClient.unsubscribe(`/sub/public`);
      console.log("success to unsubscribe");
      leaveMessage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoomWrap>
      {roomList_query && roomList_query.content.length === 0 ? (
        <XBox>
          <XImg src={x} />
        </XBox>
      ) : (
        <>
          <RoomBoxWrap>
            {roomList_query?.content?.map((room: any, i: any) => {
              return (
                <RoomBox
                  key={i}
                  onClick={() => {
                    if (room?.player4 !== "") {
                      joinRoom({ id: accessId, roomId: room.roomId });
                    }
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
                      {room?.player1 ? (
                        <RoomUsers
                          style={{ backgroundImage: `url(${team1})` }}
                        ></RoomUsers>
                      ) : (
                        <RoomUsers
                          style={{ backgroundImage: `url(${noteam})` }}
                        ></RoomUsers>
                      )}

                      {room?.player3 ? (
                        <RoomUsers
                          style={{ backgroundImage: `url(${team1})` }}
                        ></RoomUsers>
                      ) : (
                        <RoomUsers
                          style={{ backgroundImage: `url(${noteam})` }}
                        ></RoomUsers>
                      )}
                    </Team1>
                    <img src={vs} />
                    <Team2>
                      {room?.player2 ? (
                        <RoomUsers
                          style={{ backgroundImage: `url(${team2})` }}
                        ></RoomUsers>
                      ) : (
                        <RoomUsers
                          style={{ backgroundImage: `url(${noteam})` }}
                        ></RoomUsers>
                      )}
                      {room?.player4 ? (
                        <RoomUsers
                          style={{ backgroundImage: `url(${team2})` }}
                        ></RoomUsers>
                      ) : (
                        <RoomUsers
                          style={{ backgroundImage: `url(${noteam})` }}
                        ></RoomUsers>
                      )}
                    </Team2>
                    <ComeIn>
                      <span>입장하기</span>
                    </ComeIn>
                  </UsersWrap>
                </RoomBox>
              );
            })}
          </RoomBoxWrap>
          <PageButtonBox>
            {roomList_query?.content?.pageable?.totalPages < page ? (
              <PrevButton
                style={{ backgroundImage: `url(${left})` }}
                onClick={() =>
                  setPage((prevState) => Math.max(prevState - 1, 0))
                }
                disabled={page === 1}
              ></PrevButton>
            ) : (
              <PrevButton
                style={{ backgroundImage: `url(${leftend})` }}
              ></PrevButton>
            )}

            {roomList_query?.content?.pageable?.totalPages > page ? (
              <NextButton
                style={{ backgroundImage: `url(${right})` }}
                onClick={() => setPage((nextState) => nextState + 1)}
              ></NextButton>
            ) : (
              <NextButton
                style={{ backgroundImage: `url(${rightend})` }}
              ></NextButton>
            )}
          </PageButtonBox>
        </>
      )}
    </RoomWrap>
  );
};

export default Rooms;
