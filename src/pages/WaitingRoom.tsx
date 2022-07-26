import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
// hooks
import { useModal } from "../hooks/useModal";
// stomp
import stompJS from "stompjs";
import sockJS from "sockjs-client";
// cookies
import { getCookie } from "../shared/Cookies";
// apis
import apis from "../shared/api/apis";
// imgs
import team1 from "../images/lobby/team1.jpg";
import team2 from "../images/lobby/team2.jpg";
import noteam from "../images/lobby/noteam.jpg";
import { DefaultBtnL } from "../Components/Common/CommonStyle";
// css
import {
  EnemyTeamBox,
  EnemyTeamHeader,
  Header,
  MyTeamBox,
  MyTeamHeader,
  SwitImg,
  TeamWrap,
  User1,
  User2,
  UserImg,
  UserImg2,
  UserName,
  UserName2,
  VsBox,
  VSImg,
  WaitingWrap,
} from "../Components/waitingRoomCP/WaitingRoomStyled";
import HeaderBtn from "../elem/HeaderBtn";
import TwoBtnModal from "../elem/TwoBtnModal";
import HeaderRoomTitle from "../Components/Common/RoomTitle";

const WaitingRoom = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [waitingUsers, setWaitingUsers] = useState<any>();
  const [readyUser, setReadyUser] = useState<boolean>(false);
  const [roomOutModal, setRoomOutModal] = useModal<boolean>(false);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const socket = new sockJS(`${API_URL}SufficientAmountOfAlcohol`);
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const accessId = getCookie("id");
  const queryClient = useQueryClient();

  const { mutate: leaveRoom } = useMutation(apis.leaveRoomMT, {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(["room_list"]);
      socketUnsubscribe();
      navigate("/lobby");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  // // 새로고침 막기
  // const doNotReload = (event) => {
  //   if (
  //     (event.ctrlKey === true &&
  //       (event.keyCode === 78 || event.keyCode === 82)) ||
  //     event.keyCode === 116
  //   ) {
  //     return window.confirm('새로고침하면 게임이 정상작동하지 않아요:(');
  //   }
  // };
  // useEffect(() => {
  //   document.onkeydown = doNotReload;
  // });

  // leaveHandler
  const leaveHandler = useCallback(() => {
    leaveRoom({ roomId: roomId, id: accessId });
  }, [leaveRoom, roomId, accessId]);

  // 구독
  useEffect(() => {
    socketSubscribe();
    // return () => {
    //   socketUnsubscribe();
    // };
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
            `/sub/wroom/${roomId}`,
            (data: any) => {
              const response = JSON.parse(data?.body);
              const res = JSON.parse(response?.content);
              console.log(res.player1.ready);
              setWaitingUsers(res);
              if (
                (res?.player1?.ready === true &&
                  res?.player1?.id === Number(accessId)) ||
                (res?.player2?.ready === true &&
                  res?.player2?.id === Number(accessId)) ||
                (res?.player3?.ready === true &&
                  res?.player3?.id === Number(accessId)) ||
                (res?.player4?.ready === true &&
                  res?.player4?.id === Number(accessId))
              ) {
                setReadyUser(true);
              } else {
                setReadyUser(false);
              }
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
    queryClient.invalidateQueries(["room_list"]);
    stompClient.send(`/pub/wroom/${roomId}`, {}, JSON.stringify(data));
  };

  const gameReady = () => {
    const data = {
      type: "READY",
      roomId: roomId,
      sender: accessId,
      content: null,
    };
    stompClient.send(`/pub/wroom/${roomId}`, {}, JSON.stringify(data));
  };

  const changeTeam = (int: number) => {
    let num = 0;
    if (waitingUsers?.player1?.id === Number(accessId)) {
      num = 1;
    } else if (waitingUsers?.player2?.id === Number(accessId)) {
      num = 2;
    } else if (waitingUsers?.player3?.id === Number(accessId)) {
      num = 3;
    } else if (waitingUsers?.player4?.id === Number(accessId)) {
      num = 4;
    }
    const data = {
      type: "SWITCHING",
      roomId: roomId,
      sender: accessId,
      content: JSON.stringify({ switchingRequest: int, switchingSubmit: num }),
    };
    stompClient.send(`/pub/wroom/${roomId}`, {}, JSON.stringify(data));
  };

  const readyHandler = () => {
    gameReady();
  };

  useEffect(() => {
    if (
      waitingUsers?.player1?.ready === true &&
      waitingUsers?.player2?.ready === true &&
      waitingUsers?.player3?.ready === true &&
      waitingUsers?.player4?.ready === true
    ) {
      navigate(`/ingame/${roomId}`);
    }
  }, [
    waitingUsers?.player1?.ready,
    waitingUsers?.player2?.ready,
    waitingUsers?.player3?.ready,
    waitingUsers?.player4?.ready,
  ]);

  return (
    <>
      {roomOutModal && (
        <TwoBtnModal
          confirmText={"확인"}
          cancelText={"취소"}
          titleText={"정말 방에서 나가시겠습니까?"}
          upperText={"로비 화면으로 돌아갑니다."}
          lowerText={""}
          confirmFunc={leaveHandler}
          cancelFunc={setRoomOutModal}
        />
      )}
      <Header>
        <HeaderBtn clickFunc={setRoomOutModal} text={"방나가기"} />
        <HeaderRoomTitle text={`${roomId}`} />
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
                    {waitingUsers.player1.nickname}[{waitingUsers.player1.id}]
                  </UserName>
                </User1>
              ) : (
                <User1
                  onClick={() => {
                    changeTeam(1);
                  }}
                >
                  <UserImg
                    style={{ backgroundImage: `url(${noteam})` }}
                  ></UserImg>
                  <UserName>???</UserName>
                </User1>
              )}
              {waitingUsers.player3 ? (
                <User2>
                  <UserImg
                    style={{ backgroundImage: `url(${team1})` }}
                  ></UserImg>
                  <UserName>
                    {waitingUsers.player3.nickname}[{waitingUsers.player3.id}]
                  </UserName>
                </User2>
              ) : (
                <User2
                  onClick={() => {
                    changeTeam(3);
                  }}
                >
                  <UserImg
                    style={{ backgroundImage: `url(${noteam})` }}
                  ></UserImg>
                  <UserName>???</UserName>
                </User2>
              )}
            </MyTeamBox>
            <VsBox>
              <VSImg></VSImg>
              <SwitImg></SwitImg>
              <span>팀을 교체하려면</span>
              <span>빈칸을 누르세요.</span>
            </VsBox>
            <EnemyTeamBox>
              <EnemyTeamHeader>
                <span>상대 팀</span>
              </EnemyTeamHeader>
              {waitingUsers.player2 ? (
                <User1>
                  <UserImg2
                    style={{ backgroundImage: `url(${team2})` }}
                  ></UserImg2>
                  <UserName2>
                    {waitingUsers.player2.nickname}[{waitingUsers.player2.id}]
                  </UserName2>
                </User1>
              ) : (
                <User1
                  onClick={() => {
                    changeTeam(2);
                  }}
                >
                  <UserImg2
                    style={{ backgroundImage: `url(${noteam})` }}
                  ></UserImg2>
                  <UserName2>???</UserName2>
                </User1>
              )}
              {waitingUsers.player4 ? (
                <User2>
                  <UserImg2
                    style={{ backgroundImage: `url(${team2})` }}
                  ></UserImg2>
                  <UserName2>
                    {waitingUsers.player4.nickname}[{waitingUsers.player4.id}]
                  </UserName2>
                </User2>
              ) : (
                <User2
                  onClick={() => {
                    changeTeam(4);
                  }}
                >
                  <UserImg2
                    style={{ backgroundImage: `url(${noteam})` }}
                  ></UserImg2>
                  <UserName2>???</UserName2>
                </User2>
              )}
            </EnemyTeamBox>
          </TeamWrap>
        )}
        <DefaultBtnL disabled={readyUser} onClick={readyHandler}>
          {readyUser ? <span>준비 완료</span> : <span>게임 준비</span>}
        </DefaultBtnL>
      </WaitingWrap>
    </>
  );
};

export default WaitingRoom;
