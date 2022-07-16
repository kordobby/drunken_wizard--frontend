import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import flex from "../GlobalStyled/flex";
// hooks
import { getCookie } from "../../shared/Cookies";
// stomp
import stompJS from "stompjs";
import sockJS from "sockjs-client";
// import { socket } from "../../shared/WebStomp";
// interface
import { ChatType } from "../../typings/db";
import { useQueryClient } from "react-query";
// svgs
import user from "../../images/lobby/noteam.jpg";

const LobbyChat = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const iptRef = useRef<any>("");
  const [semiMsgList, setSemiMsgList] = useState<any>();
  const [msgList, setMsgList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any>();
  const [subscribeState, setSubscribeState] = useState(false);
  const socket = new sockJS(`${API_URL}SufficientAmountOfAlcohol`);
  const stompClient = stompJS.over(socket);
  const queryClient = useQueryClient();
  const accessToken = getCookie("token");
  const accessId = getCookie("id");

  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, []);

  // function waitForConnection(stompClient: stompJS.Client, callback: any) {
  //   setTimeout(function () {
  //     if (stompClient.ws.readyState === 1) {
  //       callback();
  //     } else {
  //       waitForConnection(stompClient, callback);
  //     }
  //   }, 1);
  // }

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
              // console.log(data);
              setSemiMsgList(response);
              queryClient.invalidateQueries("room_list");
              if (response.type === "JOIN") {
                setUserList(response.connectedUsers);
                // console.log(response.connectedUsers);
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
    stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
  };

  // const joinMessage = () => {
  //   const accessName = getCookie("nickname");
  //   const data = {
  //     type: "JOIN",
  //     roomId: 1,
  //     sender: accessName,
  //     message: `${accessName}님이 채팅방에 참여하였습니다!`,
  //   };
  //   waitForConnection(stompClient, function () {
  //     stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
  //   });
  // };

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
    <Wrap>
      <ProfileBox>
        <ProfileImg style={{ backgroundImage: `url(${user})` }}></ProfileImg>
        <Profile>
          <span style={{ fontSize: "24px" }}></span>
          <br />
          <span style={{ fontSize: "24px" }}></span>
        </Profile>
      </ProfileBox>
      <Users>
        {userList &&
          userList.map((v: any, i: number) => {
            return (
              <div key={i}>
                {" "}
                <UsersImg
                  style={{ backgroundImage: `url(${user})` }}
                ></UsersImg>
                <span style={{ fontSize: "24px" }}>{v.id}</span>
                <span style={{ fontSize: "24px" }}>{v.nickname}</span>
              </div>
            );
          })}
      </Users>
      <ChatBox>
        <ChatWrap>
          {msgList?.map((msg: ChatType, idx: number) => {
            if (msg === undefined) {
              return null;
            }
            if (msg.type === "JOIN") {
              return (
                <div key={idx} style={{ margin: "20px" }}>
                  <span style={{ fontSize: "18px" }}>{msg?.message}</span>
                  <br />
                </div>
              );
            }
            return (
              <div
                key={idx}
                style={{ margin: "20px", backgroundColor: "white" }}
              >
                <ChatImg style={{ backgroundImage: `url(${user})` }}></ChatImg>
                <span style={{ fontWeight: "500" }}>{msg?.sender}</span>
                <br />
                <span>{msg?.message}</span>
                <br />
              </div>
            );
          })}
        </ChatWrap>
      </ChatBox>
      <Input
        type="text"
        ref={iptRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (iptRef.current.value !== "" && e.key === "Enter") {
            sendMessage();
            iptRef.current.value = "";
            // 재확인 필요
          }
        }}
      ></Input>
      {/* <button onClick={sendMessage}>send</button> */}
    </Wrap>
  );
};

export default LobbyChat;

const Wrap = styled.div`
  width: 330px;
  height: 805px;
  margin-top: 10px;

  ${flex({ direction: "column", align: "center" })}
`;
const ProfileBox = styled.div`
  width: 330px;
  height: 145px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  ${flex({ align: "center" })};
`;
const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  margin-left: 15px;
  border-radius: 50px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Profile = styled.div``;

const Users = styled.div`
  width: 330px;
  height: 220px;
  box-sizing: border-box;
  border-radius: 12px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.5);
  ${flex({ direction: "column", align: "left" })};
`;

const UsersImg = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ChatWrap = styled.div`
  width: 300px;
  height: 350px;
  overflow-y: auto;
  background-color: rgba(202, 37, 37, 0.5);
  ${flex({ direction: "column", align: "left" })};
`;

const ChatBox = styled.div`
  width: 330px;
  height: 420px;
  margin-top: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  ${flex({ direction: "column", align: "left" })};
`;

const ChatImg = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Input = styled.input`
  width: 310px;
  height: 56px;
  border-radius: 12px;
  position: relative;
  top: -66px;
  background-color: rgba(237, 228, 242, 1);
`;
