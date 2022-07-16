import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import flex from "../GlobalStyled/flex";
// hooks
import { getCookie } from "../../shared/Cookies";
// stomp
import stompJS from "stompjs";
import { socket } from "../../shared/WebStomp";
// interface
import { ChatType } from "../../typings/db";
import { useQueryClient } from "react-query";

const LobbyChat = () => {
  const iptRef = useRef<any>("");
  const [semiMsgList, setSemiMsgList] = useState<any>();
  const [msgList, setMsgList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [subscribeState, setSubscribeState] = useState(false);
  const stompClient = stompJS.over(socket);
  const queryClient = useQueryClient();
  const accessToken = getCookie("token");
  const accessId = getCookie("id");

  // 채팅리스트 최대 개수 (휘발성)

  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, []);

  function waitForConnection(stompClient: stompJS.Client, callback: any) {
    setTimeout(function () {
      if (stompClient.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 1);
  }

  useEffect(() => {
    const list: any[] = [...msgList];
    const newList = list.push(semiMsgList);
    if (list.length > 20) {
      setMsgList(list.shift());
    }
    setMsgList(list);
  }, [semiMsgList]);

  // /* function Subscribe */
  const socketSubscribe = useCallback(() => {
    try {
      stompClient.connect(
        {
          token: accessToken,
          id: accessId,
        },
        (data: any) => {
          console.log(data);
          stompClient.subscribe(
            "/sub/public",
            (data: any) => {
              const response = JSON.parse(data.body);
              console.log(data);
              setSemiMsgList(response);
              queryClient.invalidateQueries("room_list");
              if (response.type === "JOIN") {
                setUserList(response.userList);
              }
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
    waitForConnection(stompClient, function () {
      stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
    });
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
      iptRef.current.value = "";
      // window.scrollTo(9000, 9000);
    }
  };

  return (
    <ChatWrap>
      <ChatBox>
        {" "}
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
        <button onClick={sendMessage}>send</button>
        {msgList?.map((msg: ChatType, idx: number) => {
          if (msg === undefined) {
            return null;
          }
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
      </ChatBox>
    </ChatWrap>
  );
};

export default LobbyChat;

const ChatWrap = styled.div`
  width: 30vw;
  ${flex({ direction: "column", align: "center" })};
`;

const ChatBox = styled.div`
  width: 300px;
  height: 600px;
  background-color: whitesmoke;
  overflow-y: auto;
  ${flex({ direction: "column", align: "left" })};
`;
