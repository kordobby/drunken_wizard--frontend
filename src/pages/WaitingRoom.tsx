import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
// stomp
import stompJS from "stompjs";
import { socket } from "../Shared/WebStomp";
// cookies
import { getCookie } from "../Shared/Cookies";

const waitngRoomMT = (data: any) => {
  const accessToken = getCookie("token");
  return axios.post(`http://3.35.53.184/game/${data}/join`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
};
const leaveRoomMT = (data: any) => {
  const accessToken = getCookie("token");
  return axios.post(`http://3.35.53.184/game/${data}/leave`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const WaitingRoom = () => {
  const navigate = useNavigate();
  const { roomid } = useParams();
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const accessId = getCookie("id");
  const queryClient = useQueryClient();

  // mutate
  const { mutate: waitingRoom } = useMutation(waitngRoomMT, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { mutate: leaveRoom } = useMutation(leaveRoomMT, {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries("room_list");
      navigate("/lobby");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // leaveHandler
  const leaveHandler = () => {
    leaveRoom(roomid);
  };

  // 방 접속 포스트 요청
  useEffect(() => {
    waitingRoom(roomid);
  }, [roomid]);

  // 구독
  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, []);

  // /* function Subscribe */
  const socketSubscribe = useCallback(() => {
    try {
      stompClient.connect(
        {
          token: accessToken,
          id: accessId,
        },
        () => {
          stompClient.subscribe(
            `/sub/game/${roomid}`,
            (data: any) => {
              console.log(data);
              const response = JSON.parse(data.body);
              console.log(response);
            },
            { token: accessToken }
          );
          // roomJoinMessage();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const socketUnsubscribe = useCallback(() => {
    try {
      stompClient.unsubscribe("sub-0");
      console.log("success to unsubscribe");
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const joinMessage = () => {
  //   const accessName = getCookie("nickname");
  //   const data = {
  //     type: "JOIN",
  //     roomId: 1,
  //     sender: accessName,
  //     message: `${accessName}님이 채팅방에 참여하였습니다!`,
  //   };
  //   stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
  // };

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
      <button onClick={leaveHandler}>방에서 나가기</button>
    </div>
  );
};

export default WaitingRoom;
