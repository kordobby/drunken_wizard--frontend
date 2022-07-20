import React, { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
// hooks
import useInput from "../../hooks/useInput";
// stomp
import stompJS from "stompjs";
import { socket } from "../../shared/WebStomp";
// interface
import { AddRoomType, ModalType } from "../../typings/db";
// apis
import apis from "../../shared/api/apis";
// css
import { Backdrop, CreatRoomBox, ModalContainer } from "./LobbyStyled";
import { getCookie } from "../../shared/Cookies";
import axios from "axios";

const createRoomMT = (data: any) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const accessToken = getCookie("token");
  return axios.post(`${API_URL}game/room`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const CreateRoom = ({ modalClose }: ModalType) => {
  const [roomName, setRoomName] = useInput<string>("");
  const accessId = getCookie("id");
  const accessToken = getCookie("token");
  const accessNickname = getCookie("nickname");
  const queryClient = useQueryClient();
  const stompClient = stompJS.over(socket);
  const navigate = useNavigate();

  // mutate
  const { mutate: createRoom } = useMutation(createRoomMT, {
    onSuccess: (res) => {
      console.log(res.data);
      navigate(`/waiting/${res.data.roomId}`);
      pleaseMessage();
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
        // id: accessId,
        // nickname: accessNickname,
      });
    },
    [roomName, accessId, accessNickname, createRoom]
  );

  // send
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
