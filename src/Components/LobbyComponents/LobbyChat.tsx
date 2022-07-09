import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import flex from "../GlobalStyled/flex";
// hooks
import { getCookie } from "../../shared/Cookies";
// stomp
import sockJS from "sockjs-client";
import stompJS from "stompjs";
import { socket } from "../../shared/WebStomp";
// interface
import { ChatType } from "../../typings/db";

const LobbyChat = () => {
  const iptRef = useRef<any>("");
  const [msgList, setMsgList] = useState<any>([]);
  const [subscribeState, setSubscribeState] = useState(false);
  // const socket = new sockJS("http://3.35.53.184/SufficientAmountOfAlcohol"); //   /ws-stomp
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const accessId = getCookie("id");

  // 채팅리스트 최대 개수 (휘발성)
  if (msgList.length > 20) {
    setMsgList(msgList.shift(0));
  }

  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, [subscribeState]);

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
            "/sub/public",
            (data: any) => {
              const response = JSON.parse(data.body);
              // console.log(response);
            },
            { token: accessToken }
          );
          joinMessage();
          setSubscribeState(true);
        }
      );
    } catch (error) {
      console.log(error);
      setSubscribeState(false);
    }
  }, []);

  const socketUnsubscribe = () => {
    try {
      stompClient
        .subscribe(`/sub/public`, function (data: any) {}, {})
        .unsubscribe();
      console.log("success to unsubscribe");
      setSubscribeState(false);
    } catch (error) {
      console.log(error);
    }
  };

  //입장 메세지
  const joinMessage = () => {
    const accessName = getCookie("nickname");
    const data = {
      type: "JOIN",
      roomId: 1,
      sender: accessName,
      message: `${accessName}님이 채팅방에 참여하였습니다!`,
    };
    stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
    setMsgList([...msgList, data]);
  };

  // 채팅 메세지 보내기
  const sendMessage = () => {
    if (iptRef.current.value !== "") {
      const accessName = getCookie("nickname");
      const data = {
        type: "CHAT",
        roomId: 1,
        sender: accessName,
        message: iptRef.current.value,
      };
      stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
      setMsgList([...msgList, data]);
      iptRef.current.value = "";
      window.scrollTo(9000, 9000);
    }
  };

  return (
    <div>
      <input
        type="text"
        ref={iptRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (iptRef.current.value !== "" && e.key === "Enter") {
            sendMessage();
            iptRef.current.value = "";
            // 재확인 필요
          }
        }}
      ></input>
      {/* <button onClick={trySocketConnect}>소켓연결</button> */}
      <button onClick={socketSubscribe}>구독</button>
      <button onClick={sendMessage}>send</button>
      <button onClick={socketUnsubscribe}>구독해제</button>
      {/* <button onClick={socketDisconnect}>소켓 연결 해제</button> */}

      <ChatWrap>
        {msgList.map((msg: ChatType, idx: number) => {
          if (msg.type === "JOIN") {
            return (
              <div
                key={idx}
                style={{ margin: "20px", backgroundColor: "white" }}
              >
                <span>{msg?.message}</span>
                <br />
              </div>
            );
          }
          return (
            <div key={idx} style={{ margin: "20px", backgroundColor: "white" }}>
              <h2 style={{ fontWeight: "500" }}>{msg?.sender}</h2>
              <br />
              <span>{msg?.message}</span>
              <br />
            </div>
          );
        })}
      </ChatWrap>
    </div>
  );
};

export default LobbyChat;

const ChatWrap = styled.div`
  width: 300px;
  height: 600px;
  background-color: whitesmoke;
  overflow-y: auto ${flex({ direction: "column", align: "left" })};
`;
