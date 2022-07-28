import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
// stomp
import stompJS from "stompjs";
import { socket } from "../../shared/WebStomp";
// apis
import apis from "../../shared/api/apis";
// hooks
import { getCookie } from "../../shared/Cookies";
// interface
import { SoundModalType2 } from "../../typings/db";
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
  RoomWrap,
  Team1,
  Team2,
  UsersWrap,
  VSImgRoom,
  XBox,
  XImg,
  XWrap,
} from "./LobbyStyled";
// imgs
import { useModal } from "../../hooks/useModal";
import OneBtnModal from "../../elem/OneBtnModal";

const Rooms = ({ btnSound }: SoundModalType2) => {
  const stompClient = stompJS.over(socket);
  stompClient.debug = (f) => f;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [roomCheckModal, setRoomCheckModal] = useModal(false);
  const accessId = getCookie("id");
  const accessName = getCookie("nickname");

  // query
  const { data: roomList_query } = useQuery(
    ["room_list", { page }],
    () => apis.getRoomListQR(page),
    {
      onSuccess: (data: any) => {
        // console.log(data);
        // console.log("성공했어!");
      },
      onError: (error: any) => {
        // console.log("실패", error);
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
      }
    },
    onError: (error) => {
      // console.log(error);
      navigate("/lobby");
    },
  });

  // soket
  // const leaveMessage = () => {
  //   // const accessId = getCookie("id");
  //   // const accessName = getCookie("nickname");
  //   const data = {
  //     type: "LEAVE",
  //     sender: accessId,
  //     nickname: accessName,
  //     message: `${accessName}님이 채팅방에서 나갔습니다.`,
  //   };
  //   stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
  // };

  const socketUnsubscribe = () => {
    try {
      stompClient.unsubscribe(`/sub/public`);
      // console.log("success to unsubscribe");
      // leaveMessage();
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <RoomWrap>
      {roomCheckModal && (
        <OneBtnModal
          headerText={"방이 가득 찼습니다!"}
          upperText={"다른 방을 찾아주세요."}
          lowerText={""}
          confirmText={"확인"}
          clickFunc={setRoomCheckModal}
        />
      )}
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
                  onClick={(e: any) => {
                    if (
                      room?.player1 === null ||
                      room?.player2 === null ||
                      room?.player3 === null ||
                      room?.player4 === null
                    ) {
                      joinRoom({ id: accessId, roomId: room.roomId });
                    } else {
                      setRoomCheckModal(e);
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
                        <RoomUsers team={true} />
                      ) : (
                        <RoomUsers team={false} />
                      )}
                      {room?.player3 ? (
                        <RoomUsers team={true} />
                      ) : (
                        <RoomUsers team={false} />
                      )}
                    </Team1>
                    <VSImgRoom />
                    <Team2>
                      {room?.player2 ? (
                        <RoomUsers2 team={true} />
                      ) : (
                        <RoomUsers2 team={false} />
                      )}
                      {room?.player4 ? (
                        <RoomUsers2 team={true} />
                      ) : (
                        <RoomUsers2 team={false} />
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
                page={true}
                onClick={() => {
                  setPage((prevState) => Math.max(prevState - 1, 0));
                  btnSound();
                }}
                disabled={page === 1}
              ></PrevButton>
            ) : (
              <PrevButton page={false} />
            )}

            {roomList_query?.content?.pageable?.totalPages > page ? (
              <NextButton
                page={true}
                onClick={() => {
                  setPage((nextState) => nextState + 1);
                  btnSound();
                }}
              ></NextButton>
            ) : (
              <NextButton page={false} />
            )}
          </PageButtonBox>
        </>
      )}
    </RoomWrap>
  );
};

export default Rooms;
