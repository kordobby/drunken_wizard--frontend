import React, { useCallback } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
// hooks
import { getCookie } from "../../Shared/Cookies";
import useInput from "../../hooks/useInput";
// apis
import apis from "../../Shared/api/apis";
// interface
import { SoundModalType } from "../../typings/db";
// css
import {
  CreateInput,
  CreateRoomTitle,
  CreateRoomBox,
  ModalContainer,
  ModalBack,
  ButtonBox,
} from "./LobbyStyled";
// svg
import { DefaultBtnL } from "../Common/CommonStyle";

const CreateRoom = ({ modalHandler, btnSound }: SoundModalType) => {
  const [roomName, setRoomName] = useInput<string>("");
  const accessToken = getCookie("token");
  const navigate = useNavigate();

  // mutate
  const { mutate: createRoom } = useMutation(apis.createRoomMT, {
    onSuccess: (res) => {
      navigate(`/waiting/${res.data.roomId}`);
    },
    onError: (error) => {
      // console.log(error);
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

  return (
    <>
      <ModalContainer>
        <CreateRoomBox>
          <CreateRoomTitle>
            <span>방만들기</span>
          </CreateRoomTitle>
          <CreateInput
            type="text"
            id="room-name"
            name="room-name"
            placeholder="방 이름을 입력하세요."
            maxLength={11}
            value={roomName}
            onChange={setRoomName}
          ></CreateInput>
          <ButtonBox>
            <DefaultBtnL
              style={{ marginRight: "0.52vw" }}
              disabled={false}
              onClick={(e: any) => {
                btnSound();
                onCreateRoom(e);
              }}
            >
              <span>방만들기</span>
            </DefaultBtnL>
            <DefaultBtnL
              style={{ marginLeft: "0.52vw" }}
              disabled={true}
              onClick={(e: any) => {
                btnSound();
                modalHandler(e);
                navigate("/lobby");
              }}
            >
              <span>취소</span>
            </DefaultBtnL>
          </ButtonBox>
        </CreateRoomBox>
        <ModalBack
          onClick={(e: any) => {
            modalHandler(e);
          }}
        ></ModalBack>
      </ModalContainer>
    </>
  );
};

export default CreateRoom;
