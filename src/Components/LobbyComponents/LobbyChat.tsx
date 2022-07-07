import React, { useCallback, useEffect, useRef, useState } from "react";
import sockJS from "sockjs-client";
import stompJS from "stompjs";
import styled from "styled-components";
import { getCookie } from "../../shared/Cookies";
import flex from "../GlobalStyled/flex";

const LobbyChat = () => {
  const [msg, setMsg] = useState<string>("");
  const iptRef = useRef<any>("");
  const [msgList, setMsgList] = useState<any>([]);
  const [subscribeState, setSubscribeState] = useState(false);
  const socket = new sockJS("http://3.35.53.184/SufficientAmountOfAlcohol"); //   /ws-stomp
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const accessId = getCookie("username");

  // 채팅리스트 최대 개수 (휘발성)
  if (msgList.length > 20) {
    setMsgList(msgList.shift(0));
  }

  const onChangeMsg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMsg(e.target.value);
      // setMsg(iptRef.current.value); 재확인 필요
    },
    [msg]
  );

  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, [subscribeState]);

  const trySocketConnect = () => {
    stompClient.connect(
      {
        token: accessToken,
        id: accessId,
      },
      () => {
        console.log("connect success");
      }
    );
    // try {
    //   stompClient.connect(
    //     {
    //       token: accessToken,
    //     },
    //     () => {
    //       console.log("connect success");
    //     }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
  };

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
              console.log(response);
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
  }, [subscribeState]);

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

  const socketDisconnect = () => {
    stompClient.disconnect(
      () => {
        console.log("disconnect");
      },
      { token: accessToken }
    );
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
    if (msg !== "") {
      const accessName = getCookie("nickname");
      const data = {
        type: "CHAT",
        roomId: 1,
        sender: accessName,
        message: msg,
      };
      stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
      setMsgList([...msgList, data]);
      setMsg("");
      window.scrollTo(9000, 9000);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={msg}
        ref={iptRef}
        onChange={onChangeMsg}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (msg !== "" && e.key === "Enter") {
            sendMessage();
            iptRef.current.value = "";
            // 재확인 필요
          }
        }}
      ></input>
      <button onClick={trySocketConnect}>소켓연결</button>
      <button onClick={socketSubscribe}>구독</button>
      <button onClick={sendMessage}>send</button>
      <button onClick={socketUnsubscribe}>구독해제</button>
      <button onClick={socketDisconnect}>소켓 연결 해제</button>

      <ChatWrap>
        {msgList.map((msg: any, idx: any) => {
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
