import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
// hooks
import { getCookie } from "../../shared/Cookies";
// stomp
import stompJS from "stompjs";
import sockJS from "sockjs-client";
// interface
import { ChatType } from "../../typings/db";
// css
import {
  ChatBox,
  ChatImg,
  ChatMsg,
  ChatUser,
  ChatWrap,
  Input,
  JoinUser,
  MyChat,
  MyMsg,
  MyUserBox,
  Profile,
  ProfileBox,
  ProfileImg,
  ProfileSpan,
  UserBox,
  Users,
  UsersImg,
  Wrap,
} from "./LobbyStyled";
// svgs
import user from "../../images/lobby/noteam.jpg";

const LobbyChat = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const iptRef = useRef<any>("");
  const [semiMsgList, setSemiMsgList] = useState<any>();
  const [msgList, setMsgList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any>();
  const socket = new sockJS(`${API_URL}SufficientAmountOfAlcohol`);
  const stompClient = stompJS.over(socket);
  const queryClient = useQueryClient();
  const accessToken = getCookie("token");
  const accessId = getCookie("id");
  const accessNickname = getCookie("nickname");

  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, []);

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
              queryClient.invalidateQueries(["room_list"]);
              if (response.type === "JOIN") {
                setUserList(response.connectedUsers);
                // console.log(response.connectedUsers);
              }
              // if (response.type === "LEAVE") {
              //   const newUserList = userList.filter((v: any) => {
              //     return v.id === Number(accessId) ? false : true;
              //   });
              //   console.log(newUserList);
              //   setUserList(newUserList);
              // }
            },
            { token: accessToken }
          );
          joinMessage();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(userList);
  const socketUnsubscribe = () => {
    try {
      stompClient.unsubscribe(`/sub/public`);
      console.log("success to unsubscribe");
    } catch (error) {
      console.log(error);
    }
  };

  //입장 메세지
  const joinMessage = () => {
    const accessId = getCookie("id");
    const accessName = getCookie("nickname");
    const data = {
      type: "JOIN",
      sender: accessId,
      nickname: accessName,
      message: `${accessName}님이 채팅방에 참여하였습니다!`,
    };
    stompClient.send("/pub/chat/send", {}, JSON.stringify(data));
  };

  // 채팅 메세지 보내기
  const sendMessage = () => {
    if (iptRef.current.value !== "") {
      const accessName = getCookie("nickname");
      const data = {
        type: "CHAT",
        sender: accessId,
        nickname: accessName,
        message: iptRef.current.value,
        connectedUsers: [],
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
          <ProfileSpan style={{ fontSize: "24px" }}>
            {accessNickname}_[{accessId}]
          </ProfileSpan>
          <ProfileSpan style={{ fontSize: "24px" }}>10승 11패</ProfileSpan>
        </Profile>
      </ProfileBox>
      <UserBox>
        {userList &&
          userList.map((v: any, i: number) => {
            return (
              <Users key={i}>
                <UsersImg style={{ backgroundImage: `url(${user})` }} />
                <span>
                  {v.nickname}_[{v.id}]
                </span>
              </Users>
            );
          })}
      </UserBox>
      <ChatBox>
        <ChatWrap>
          {msgList?.map((msg: ChatType, idx: number) => {
            if (msg === undefined) {
              return null;
            }
            if (msg.type === "JOIN" || msg.type === "LEAVE") {
              return (
                <JoinUser key={idx}>
                  <span>{msg?.message}</span>
                </JoinUser>
              );
            }
            if (msg.sender !== accessId) {
              return (
                <div key={idx}>
                  <ChatUser>
                    <ChatImg
                      style={{ backgroundImage: `url(${user})` }}
                    ></ChatImg>
                    <span>
                      {msg?.nickname}_[{msg?.sender}]
                    </span>
                  </ChatUser>
                  <ChatMsg>{msg?.message}</ChatMsg>
                </div>
              );
            }
            return (
              <MyUserBox>
                <MyChat>
                  <ChatImg
                    style={{ backgroundImage: `url(${user})` }}
                  ></ChatImg>
                  <span style={{ fontWeight: "500" }}>
                    {msg?.nickname}_[{msg?.sender}]
                  </span>
                </MyChat>
                <MyMsg>{msg?.message}</MyMsg>
              </MyUserBox>
            );
          })}
        </ChatWrap>
        <Input
          type="text"
          ref={iptRef}
          placeholder="채팅을 시작하세요."
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (iptRef.current.value !== "" && e.key === "Enter") {
              sendMessage();
              iptRef.current.value = "";
            }
          }}
        ></Input>
      </ChatBox>
      {/* <button onClick={sendMessage}>send</button> */}
    </Wrap>
  );
};

export default LobbyChat;
