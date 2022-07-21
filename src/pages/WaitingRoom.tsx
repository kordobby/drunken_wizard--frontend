import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
// stomp
import stompJS from "stompjs";
import sockJS from "sockjs-client";
// cookies
import { getCookie } from "../shared/Cookies";
// apis
import apis from "../shared/api/apis";
import styled from "styled-components";
import flex from "../Components/GlobalStyled/flex";
// imgs
import waitingBack from "../images/background/waitingBackground.png";
import header from "../images/imgs/header.png";
import vs from "../images/imgs/vs.png";
import team1 from "../images/lobby/team1.jpg";
import team2 from "../images/lobby/team2.jpg";
import noteam from "../images/lobby/noteam.jpg";
import roomoutBtn from "../images/buttons/BTN_roomout.png";

const WaitingRoom = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [waitingUsers, setWaitingUsers] = useState<any>();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const socket = new sockJS(`${API_URL}SufficientAmountOfAlcohol`);
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const accessId = getCookie("id");
  const queryClient = useQueryClient();

  // mutate
  const { mutate: joinRoom } = useMutation(apis.joinRoomMT, {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(["room_list"]);
    },
    onError: (error) => {
      console.log(error);
      navigate("/lobby");
    },
  });
  const { mutate: leaveRoom } = useMutation(apis.leaveRoomMT, {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(["room_list"]);
      navigate("/lobby");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // leaveHandler
  const leaveHandler = useCallback(() => {
    leaveRoom({ roomId: roomId, id: accessId });
  }, [leaveRoom, roomId, accessId]);

  // 방 접속 포스트 요청
  useEffect(() => {
    joinRoom({ roomId: roomId, id: accessId });
  }, [joinRoom, roomId, accessId]);

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
              const response = JSON.parse(data?.body);
              const res = JSON.parse(response?.content);
              console.log(res);
              setWaitingUsers(res);
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
      stompClient.unsubscribe(`/sub/game/${roomId}`);
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
    };
    stompClient.send(`/pub/game/${roomId}`, {}, JSON.stringify(data));
  };

  const gameReady = () => {
    const data = {
      type: "READY",
      roomId: roomId,
      sender: accessId,
      content: null,
    };
    stompClient.send(`/pub/game/${roomId}`, {}, JSON.stringify(data));
  };

  const readyHandler = () => {
    gameReady();
  };

  useEffect(() => {
    waitingUsers &&
      waitingUsers.player1.ready === true &&
      waitingUsers.player2.ready === true &&
      waitingUsers.player3.ready === true &&
      waitingUsers.player4.ready === true &&
      navigate(`/ingame/${roomId}`);
  }, [
    waitingUsers?.player1?.ready,
    waitingUsers?.player2?.ready,
    waitingUsers?.player3?.ready,
    waitingUsers?.player4?.ready,
  ]);
  return (
    <>
      <Header>
        <RoomoutBtn onClick={leaveHandler}>
          <img src={roomoutBtn}></img>
        </RoomoutBtn>
      </Header>
      <WaitingWrap>
        {waitingUsers && (
          <TeamWrap>
            <MyTeamBox>
              <MyTeamHeader>
                <span>나의 팀</span>
              </MyTeamHeader>
              {waitingUsers.player1 ? (
                <User1>
                  <UserImg
                    style={{ backgroundImage: `url(${team1})` }}
                  ></UserImg>
                  <UserName>
                    {waitingUsers.player1.nickname}_[{waitingUsers.player1.id}]
                  </UserName>
                </User1>
              ) : (
                <User1>
                  <UserImg
                    style={{ backgroundImage: `url(${noteam})` }}
                  ></UserImg>
                  <UserName>유저 없음</UserName>
                </User1>
              )}
              {waitingUsers.player3 ? (
                <User2>
                  <UserImg
                    style={{ backgroundImage: `url(${team1})` }}
                  ></UserImg>
                  <UserName>
                    {waitingUsers.player3.nickname}_[{waitingUsers.player3.id}]
                  </UserName>
                </User2>
              ) : (
                <User2>
                  <UserImg
                    style={{ backgroundImage: `url(${noteam})` }}
                  ></UserImg>
                  <UserName>유저 없음</UserName>
                </User2>
              )}
            </MyTeamBox>
            <img src={vs}></img>
            <MyTeamBox>
              <MyTeamHeader>
                <span>상대 팀</span>
              </MyTeamHeader>
              {waitingUsers.player2 ? (
                <User1>
                  <UserImg
                    style={{ backgroundImage: `url(${team2})` }}
                  ></UserImg>
                  <UserName>
                    {waitingUsers.player2.nickname}_[{waitingUsers.player2.id}]
                  </UserName>
                </User1>
              ) : (
                <User1>
                  <UserImg
                    style={{ backgroundImage: `url(${noteam})` }}
                  ></UserImg>
                  <UserName>유저 없음</UserName>
                </User1>
              )}
              {waitingUsers.player4 ? (
                <User2>
                  <UserImg
                    style={{ backgroundImage: `url(${team2})` }}
                  ></UserImg>
                  <UserName>
                    {waitingUsers.player4.nickname}_[{waitingUsers.player4.id}]
                  </UserName>
                </User2>
              ) : (
                <User2>
                  <UserImg
                    style={{ backgroundImage: `url(${noteam})` }}
                  ></UserImg>
                  <UserName>유저 없음</UserName>
                </User2>
              )}
            </MyTeamBox>
          </TeamWrap>
        )}
        <ReadyBtn onClick={readyHandler}>준비완료</ReadyBtn>
      </WaitingWrap>
    </>
  );
};

export default WaitingRoom;
const Header = styled.header`
  width: 100vw;
  min-width: 70vw;
  height: 150px;
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${header});
  ${flex({ align: "center", justify: "space-between" })}
`;
const RoomoutBtn = styled.button`
  border: none;
  background-color: transparent;
  margin-left: 50px;
  background-image: url(${roomoutBtn});
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;
const ReadyBtn = styled.button`
  border: none;
  background-color: transparent;
  background-image: url(${roomoutBtn});
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;
const WaitingWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${waitingBack});
  ${flex({ align: "center", justify: "center", direction: "column" })}
  z-index: -5;
`;
const TeamWrap = styled.div`
  width: 70%;
  height: 70%;

  ${flex({ align: "center", justify: "space-between" })}
`;
const MyTeamBox = styled.div`
  width: 460px;
  height: 680px;
  border-radius: 12px;
  border: 2px solid #3f0984;
  background-color: #ede4f2;
  ${flex({ align: "center", direction: "column" })}
`;
const MyTeamHeader = styled.div`
  width: 460px;
  height: 100px;
  border-radius: 10px 10px 0 0;
  background-color: #3f0984;
  span {
    font-size: 36px;
    color: white;
  }

  ${flex({ align: "center", justify: "center" })}
`;
const User1 = styled.div`
  width: 280px;
  height: 38%;
  padding: 50px 150px 0 0;
  /* background-color: red; */
  ${flex({ align: "center", direction: "column" })}
`;
const User2 = styled.div`
  width: 280px;
  height: 38%;
  padding: 0 0 0 150px;
  /* background-color: blue; */
  ${flex({ align: "center", direction: "column" })}
`;
const UserImg = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const UserName = styled.span`
  width: 220px;
  height: 50px;
  font-size: 24px;
  margin: -20px;
  background-color: white;
  ${flex({ align: "center", justify: "center" })}
`;
