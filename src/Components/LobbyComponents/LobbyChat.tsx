import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
// hooks
import { getCookie } from "../../shared/Cookies";
// stomp
import stompJS from "stompjs";
import sockJS from "sockjs-client";
// interface
import { ChatType, UserHistoryProps } from "../../typings/db";
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
// images
import user from "../../images/lobby/noteam.jpg";
import apis from "../../shared/api/apis";

const LobbyChat = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const iptRef = useRef<any>("");
  const scrollRef = useRef<any>();
  const [semiMsgList, setSemiMsgList] = useState<any>();
  const [msgList, setMsgList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any>();
  const [userHistoryState, setUserHistoryState] = useState<any>();
  const socket = new sockJS(`${API_URL}SufficientAmountOfAlcohol`);
  const stompClient = stompJS.over(socket);
  const queryClient = useQueryClient();
  const accessToken = getCookie("token");
  const accessId = getCookie("id");
  const accessNickname = getCookie("nickname");

  // mutate
  const { mutate: userHistory } = useMutation(apis.userHistoryQR, {
    onSuccess: (data: any) => {
      console.log(data);
      console.log("전적 로드 성공했어!");
    },
    onError: (error: any) => {
      console.log("전적 로드 실패", error);
    },
  });

  // scroll
  const scrollToMyRef = () => {
    const scroll =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    scrollRef.current.scrollTo(0, scroll);
  };

  useEffect(() => {
    scrollToMyRef();
  }, [scrollToMyRef]);

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
                userHistory();
              }
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

  const socketUnsubscribe = () => {
    try {
      leaveMessage();
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
  // leave 메세지
  const leaveMessage = () => {
    const accessId = getCookie("id");
    const accessName = getCookie("nickname");
    const data = {
      type: "LEAVE",
      sender: accessId,
      nickname: accessName,
      // message: `${accessName}님이 채팅방에서 나갔습니다.`,
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
          <ProfileSpan>
            {accessNickname}[{accessId}]
          </ProfileSpan>
          <ProfileSpan>
            {/* {userHistory?.data.winCount}승 {userHistory?.data.loseCount}패{" "}
            {userHistory?.data.winRate}% */}
          </ProfileSpan>
        </Profile>
      </ProfileBox>
      <UserBox>
        {userList &&
          userList.map((v: any, i: number) => {
            return (
              <Users key={i}>
                <UsersImg style={{ backgroundImage: `url(${user})` }} />
                <span>
                  {v.nickname}[{v.id}]
                </span>
              </Users>
            );
          })}
      </UserBox>
      <ChatBox>
        <ChatWrap ref={scrollRef}>
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
            if (Number(msg.sender) === Number(accessId)) {
              return (
                <MyUserBox key={idx}>
                  <MyChat>
                    <ChatImg
                      style={{ backgroundImage: `url(${user})` }}
                    ></ChatImg>
                    <span>
                      {msg?.nickname}[{msg?.sender}]
                    </span>
                  </MyChat>
                  <MyMsg>{msg?.message}</MyMsg>
                </MyUserBox>
              );
            } else {
              return (
                <div key={idx}>
                  <ChatUser>
                    <ChatImg
                      style={{ backgroundImage: `url(${user})` }}
                    ></ChatImg>
                    <span>
                      {msg?.nickname}[{msg?.sender}]
                    </span>
                  </ChatUser>
                  <ChatMsg>{msg?.message}</ChatMsg>
                </div>
              );
            }
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
