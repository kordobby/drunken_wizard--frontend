import axios from "axios";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { getCookie } from "../shared/Cookies";

const waitngRoomMT = (data: any) => {
  const accessToken = getCookie("token");
  return axios.post(`http://13.124.63.214/chat/game/${data}/join`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
};
const exitRoomMT = (data: any) => {
  const accessToken = getCookie("token");
  return axios.post(`http://13.124.63.214/chat/game/${data}/join`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const WaitingRoom = () => {
  // mutate
  const { roomid } = useParams();
  const { mutate: waitingRoom } = useMutation(waitngRoomMT, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    waitingRoom(roomid);
  }, [roomid, waitingRoom]);

  const { mutate: exitRoom } = useMutation(exitRoomMT, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // const exitHandler = () => {
  //   exitRoom()
  // }
  return (
    <div>
      웨이팅룸입니다.
      <div>
        <span>1팀</span>
        <br />
        <span>닉네임</span>
        <span>닉네임</span>
      </div>
      <br />
      <div>
        <span>2팀</span>
        <br />
        <span>닉네임</span>
        <span>닉네임</span>
      </div>
      <button>방에서 나가기</button>
    </div>
  );
};

export default WaitingRoom;
