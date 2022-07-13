import React, { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
// hooks
import useInput from "../../hooks/useInput";
// interface
import { ModalType } from "../../typings/db";
// apis
import apis from "../../Shared/api/apis";
// css
import { Backdrop, CreatRoomBox, ModalContainer } from "./LobbyStyled";

const CreateRoom = ({ modalClose }: ModalType) => {
  const [roomName, setRoomName] = useInput<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // mutate
  const { mutate: createRoom } = useMutation(apis.createRoomMT, {
    onSuccess: (res) => {
      console.log(res.data);
      queryClient.invalidateQueries("room_list");
      navigate(`/waiting/${res.data}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // handler
  const onCreateRoom = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      createRoom({ roomName: roomName });
    },
    [roomName, createRoom]
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
