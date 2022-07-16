import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
// stomp
import stompJS from "stompjs";
import { socket } from "../shared/WebStomp";
// cookies
import { getCookie } from "../shared/Cookies";
// interface
import { AddRoomType } from "../typings/db";

const joinRoomMT = (data: AddRoomType) => {
  const accessToken = getCookie("token");
  return axios.post(`http://13.124.63.214/game/${data.roomId}/join`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
};
const leaveRoomMT = (data: any) => {
  const accessToken = getCookie("token");
  return axios.post(`http://13.124.63.214/game/${data.roomId}/leave`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const WaitingRoom = () => {
  const [userList, setUserList] = useState<any>();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const accessId = getCookie("id");
  const queryClient = useQueryClient();

  // mutate
  const { mutate: joinRoom } = useMutation(joinRoomMT, {
    onMutate: (res) => {
      // queryClient.invalidateQueries();
    },
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries("room_list");
    },
    onError: (error) => {
      console.log(error);
      navigate("/lobby");
    },
  });
  const { mutate: leaveRoom } = useMutation(leaveRoomMT, {
    onSuccess: (res) => {
      console.log(res);
      leaveRoomMessage();
      queryClient.invalidateQueries("room_list");
      navigate("/lobby");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // leaveHandler
  const leaveHandler = () => {
    leaveRoom({ roomId: roomId, id: accessId });
  };

  // 방 접속 포스트 요청
  useEffect(() => {
    joinRoom({ roomId: roomId, id: accessId });
  }, [roomId]);

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
            `/sub/game/${roomId}`,
            (data: any) => {
              console.log(data);
              const response = JSON.parse(data.body);
              console.log(response);
            },
            { token: accessToken }
          );
          joinRoomMessage();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const socketUnsubscribe = useCallback(() => {
    try {
      stompClient
        .subscribe(`/sub/game/${roomId}`, function (data: any) {}, {})
        .unsubscribe();
      leaveRoomMessage();
      console.log("success to unsubscribe");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const joinRoomMessage = () => {
    const data = {
      type: "UPDATE",
      roomId: roomId,
      sender: accessId,
      content: null,
      // message: `${accessName}님이 채팅방에 참여하였습니다!`,
    };
    stompClient.send(`/pub/game/${roomId}`, {}, JSON.stringify(data));
  };

  const leaveRoomMessage = () => {
    const data = {
      type: "LEAVE",
      roomId: roomId,
      sender: accessId,
      // message: `${accessName}님이 채팅방에 참여하였습니다!`,
    };
    stompClient.send(`/pub/game/${roomId}`, {}, JSON.stringify(data));
  };

  return (
    <div>
      웨이팅룸입니다.
      <div>
        <span>1팀</span>
        <br />
        <span>{userList}</span>
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
