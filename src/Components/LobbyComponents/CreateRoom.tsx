import React, { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
// hooks
import useInput from "../../hooks/useInput";
// stomp
import stompJS from "stompjs";
import { socket } from "../../shared/WebStomp";
// interface
import { ModalType } from "../../typings/db";
// apis
import apis from "../../shared/api/apis";
// css
import { Backdrop, CreatRoomBox, ModalContainer } from "./LobbyStyled";
import { getCookie } from "../../shared/Cookies";

const CreateRoom = ({ modalClose }: ModalType) => {
  const [roomName, setRoomName] = useInput<string>("");
  const accessToken = getCookie("token");
  const queryClient = useQueryClient();
  const stompClient = stompJS.over(socket);
  const navigate = useNavigate();

  // mutate
  const { mutate: createRoom } = useMutation(apis.createRoomMT, {
    onSuccess: (res) => {
      console.log(res.data);
      navigate(`/waiting/${res.data.roomId}`);
      lobbyLeaveMessage();
    },
    onError: (error) => {
      console.log(error);
      navigate(`/lobby`);
    },
  });

  // handler
  const onCreateRoom = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      accessToken && e.preventDefault();
      createRoom({
        roomName: roomName,
      });
    },
    [roomName, createRoom]
  );

  // send
  const lobbyLeaveMessage = () => {
    const accessName = getCookie("nickname");
    const data = {
      type: "LEAVE",
      roomId: 1,
      sender: accessName,
      message: `${accessName}님이 채팅방에서 나갔습니다.`,
    };
    stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
  };

  return (
    <>
      <ModalContainer>
        <CreatRoomBox>
          <span>방만들기</span>
          <input
            type="text"
            id="room-name"
            name="room-name"
            maxLength={6}
            value={roomName}
            onChange={setRoomName}
          ></input>
          <button
            onClick={(e) => {
              onCreateRoom(e);
              modalClose();
              navigate("/waiting");
            }}
          >
            방 생성
          </button>
        </CreatRoomBox>
        <Backdrop onClick={modalClose} />
      </ModalContainer>
    </>
  );
};

export default CreateRoom;
