import React, { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
// hooks
import useInput from "../../hooks/useInput";
// interface
import { ModalType } from "../../typings/db";
// apis
import apis from "../../shared/api/apis";
// css
import { Backdrop, CreatRoomBox, ModalContainer } from "./LobbyStyled";
import { getCookie } from "../../shared/Cookies";

const CreateRoom = ({ modalClose }: ModalType) => {
  const [roomName, setRoomName] = useInput<string>("");
  const accessId = getCookie("id");
  const accessNickname = getCookie("nickname");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // mutate
  const { mutate: createRoom } = useMutation(apis.createRoomMT, {
    onSuccess: (res) => {
      console.log(res.data);
      queryClient.invalidateQueries("room_list");
      navigate(`/waiting/${res.data.roomId}`);
    },
    onError: (error) => {
      console.log(error);
      navigate(`/lobby`);
    },
  });

  // handler
  const onCreateRoom = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      createRoom({
        roomName: roomName,
        // id: accessId,
        // nickname: accessNickname,
      });
    },
    [roomName, accessId, accessNickname, createRoom]
  );

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
