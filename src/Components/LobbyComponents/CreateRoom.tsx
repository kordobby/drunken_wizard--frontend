import axios from "axios";
import React, { PropsWithChildren, useCallback } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// hooks
import useInput from "../../hooks/useInput";
import { getCookie } from "../../shared/Cookies";
// css
import flex from "../GlobalStyled/flex";

interface ModalType {
  modalClose: () => void;
}

const createRoomMT = (data: object) => {
  const accessToken = getCookie("token");
  return axios.post("http://13.124.63.214/chat/game/room", data, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const CreateRoom = ({ modalClose }: ModalType) => {
  const [roomName, setRoomName] = useInput("");
  const navigate = useNavigate();

  const { mutate: createRoom } = useMutation(createRoomMT, {
    onSuccess: (res: any) => {
      console.log(res.data);
      navigate(`/waiting/${res.data}`);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

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

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${flex({ align: "center", justify: "center" })}
  position: absolute;
`;

const CreatRoomBox = styled.div`
  width: 600px;
  height: 300px;
  ${flex({ direction: "column", align: "center" })};
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;
