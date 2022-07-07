import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useMutation } from "react-query";
import { Link, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { getCookie } from "../shared/Cookies";
import stompJS from "stompjs";

const waitngRoomMT = (data: any) => {
  const accessToken = getCookie("token");
  return axios.post(`http://13.124.63.214/chat/game/${data}/join`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
};
// const exitRoomMT = (data: any) => {
//   const accessToken = getCookie("token");
//   return axios.post(`http://13.124.63.214/chat/game/${data}/join`, data, {
//     headers: {
//       Authorization: accessToken,
//     },
//   });
// };

const WaitingRoom = () => {
  // mutate
  const { roomid } = useParams();
  const socket = new SockJS("http://13.124.63.214/chat"); //   /ws-stomp
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const accessId = getCookie("username");

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

  const socketUnsubscribe = () => {
    try {
      stompClient
        .subscribe(`/sub/public`, function (data: any) {}, {})
        .unsubscribe();
      console.log("success to unsubscribe");
    } catch (error) {
      console.log(error);
    }
  };

  //입장 메세지
  const roomJoinMessage = () => {
    const accessName = getCookie("nickname");
    const data = {
      type: "JOIN",
      roomId: 1,
      sender: accessName,
      message: `${accessName}님이 채팅방에 참여하였습니다!`,
    };
    stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
    console.log(data);
  };

  // const { mutate: exitRoom } = useMutation(exitRoomMT, {
  //   onSuccess: (res) => {
  //     console.log(res);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

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
      <Link to={"/lobby"}>
        <button>방에서 나가기</button>
      </Link>
    </div>
  );
};

export default WaitingRoom;
