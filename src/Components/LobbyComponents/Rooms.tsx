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
  Impossible,
  NextButton,
  PageButtonBox,
  PrevButton,
  RoomBox,
  RoomBoxWrap,
  RoomName,
  RoomNumber,
  RoomTitle,
  RoomUsers,
  RoomUsers2,
  RoomUsersX,
  RoomUsersX2,
  RoomWrap,
  Team1,
  Team2,
  UsersWrap,
  XBox,
  XImg,
  XWrap,
} from "./LobbyStyled";
// imgs
import team1 from "../../images/lobby/team1.jpg";
import team2 from "../../images/lobby/team2.jpg";
import noteam from "../../images/lobby/noteam.jpg";
import vs from "../../images/lobby/vs.svg";
import right from "../../images/buttons/BTN_right.svg";
import rightend from "../../images/buttons/BTN_rightend.svg";
import left from "../../images/buttons/BTN_left.svg";
import leftend from "../../images/buttons/BTN_leftend.svg";
import { VSImg } from "../waitingRoomCP/WaitingRoomStyled";

const Rooms = () => {
  const queryClient = useQueryClient();
  const stompClient = stompJS.over(socket);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const accessId = getCookie("id");
  const accessName = getCookie("nickname");

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
        leaveMessage();
      }
    },
    onError: (error) => {
      console.log(error);
      navigate("/lobby");
    },
  });

  const leaveMessage = () => {
    // const accessId = getCookie("id");
    // const accessName = getCookie("nickname");
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
      // leaveMessage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoomWrap>
      {roomList_query && roomList_query.content.length === 0 ? (
        <XWrap>
          <XBox>
            <XImg />
            <span>현재 생성된 방이 없습니다.</span>
          </XBox>
        </XWrap>
      ) : (
        <>
          <RoomBoxWrap>
            {roomList_query?.content?.map((room: any, i: any) => {
              return (
                <RoomBox
                  key={i}
                  onClick={() => {
                    if (
                      room?.player1 === null ||
                      room?.player2 === null ||
                      room?.player3 === null ||
                      room?.player4 === null
                    ) {
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
                        <RoomUsersX
                          style={{ backgroundImage: `url(${noteam})` }}
                        ></RoomUsersX>
                      )}

                      {room?.player3 ? (
                        <RoomUsers
                          style={{ backgroundImage: `url(${team1})` }}
                        ></RoomUsers>
                      ) : (
                        <RoomUsersX
                          style={{ backgroundImage: `url(${noteam})` }}
                        ></RoomUsersX>
                      )}
                    </Team1>
                    <VSImg src={vs} />
                    <Team2>
                      {room?.player2 ? (
                        <RoomUsers2
                          style={{ backgroundImage: `url(${team2})` }}
                        ></RoomUsers2>
                      ) : (
                        <RoomUsersX2
                          style={{ backgroundImage: `url(${noteam})` }}
                        ></RoomUsersX2>
                      )}
                      {room?.player4 ? (
                        <RoomUsers2
                          style={{ backgroundImage: `url(${team2})` }}
                        ></RoomUsers2>
                      ) : (
                        <RoomUsersX2
                          style={{ backgroundImage: `url(${noteam})` }}
                        ></RoomUsersX2>
                      )}
                    </Team2>
                    {room?.player1 === null ||
                    room?.player2 === null ||
                    room?.player3 === null ||
                    room?.player4 === null ? (
                      <ComeIn>
                        <span>입장하기</span>
                      </ComeIn>
                    ) : (
                      <Impossible>
                        <span>입장불가</span>
                      </Impossible>
                    )}
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
