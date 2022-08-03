/* Package */
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";

/* Stomp */
import stompJS from "stompjs";

/* apis */
import apis from "../../Shared/api/apis";

/* Hooks */
import { getCookie } from "../../Shared/Cookies";
import { useModal } from "../../hooks/useModal";

/* Interface */
import { SoundModalType2 } from "../../typings/db";

/* Components */
import OneBtnModal from "../../elem/OneBtnModal";

/* CSS & SC */
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

const Rooms = ({ btnSound }: SoundModalType2) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const socket = new SockJS(`${API_URL}SufficientAmountOfAlcohol`);
  const stompClient = stompJS.over(socket);
  stompClient.debug = (f) => f;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [roomCheckModal, setRoomCheckModal] = useModal(false);
  const accessId = getCookie("id");

  // query
  const { data: roomList_query } = useQuery(
    ["room_list", { page }],
    () => apis.getRoomListQR(page),
    {
      onSuccess: (data: any) => {
        // console.log(data);
      },
      onError: (error: any) => {
        // console.log("실패", error);
      },
      keepPreviousData: true,
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

  const socketUnsubscribe = () => {
    try {
      stompClient.unsubscribe(`/sub/public`);
      // console.log("success to unsubscribe");
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
