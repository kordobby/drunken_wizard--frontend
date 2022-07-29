import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useSound from "use-sound";
// hooks
import { useModal } from "../hooks/useModal";
// stomp
import stompJS from "stompjs";
import sockJS from "sockjs-client";
// cookies
import { getCookie } from "../Shared/Cookies";
// apis
import apis from "../Shared/api/apis";
// css
import {
  Header,
  ReadyName,
  SwitImg,
  TeamBox,
  TeamHeader,
  TeamWrap,
  User1,
  User2,
  UserImg,
  UserName,
  VsBox,
  VSImg,
  WaitingWrap,
  XUserImg,
} from "../Components/waitingRoomCP/WaitingRoomStyled";
import HeaderBtn from "../elem/HeaderBtn";
import TwoBtnModal from "../elem/TwoBtnModal";
import HeaderRoomTitle from "../Components/Common/RoomTitle";
import { DefaultBtnL } from "../Components/Common/CommonStyle";
// sounds
import btnSound from "../sounds/buttonSound.mp3";
import Loading from "./Loading";

const WaitingRoom = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [waitingUsers, setWaitingUsers] = useState<any>();
  const [readyUser, setReadyUser] = useState<boolean>(false);
  const [roomOutModal, setRoomOutModal] = useModal<boolean>(false);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socket = new sockJS(`${API_URL}SufficientAmountOfAlcohol`);
  const stompClient = stompJS.over(socket);
  stompClient.debug = (f) => f;
  const accessToken = getCookie("token");
  const accessId = getCookie("id");
  const queryClient = useQueryClient();
  const [play] = useSound(btnSound);

  const { mutate: leaveRoom } = useMutation(apis.leaveRoomMT, {
    onSuccess: (res) => {
      // console.log(res);
      queryClient.invalidateQueries(["room_list"]);
      socketUnsubscribe();
      navigate("/lobby");
    },
    onError: (error) => {
      // console.log(error);
    },
  });

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
      // console.log(error);
    }
  }, []);

  const socketUnsubscribe = useCallback(() => {
    try {
      stompClient.unsubscribe(`/sub/game/${roomId}`);
      // console.log("success to unsubscribe");
    } catch (error) {
      // console.log(error);
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
    play();
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
      <WaitingWrap>
        {waitingUsers && (
          <TeamWrap>
            <TeamBox team={true}>
              <TeamHeader team={true}>
                <span>● Team Purple ●</span>
              </TeamHeader>
              {waitingUsers.player1 ? (
                <User1>
                  <UserImg team={true} />
                  {waitingUsers?.player1?.ready ? (
                    <ReadyName team={true}>
                      {waitingUsers.player1.nickname}[{waitingUsers.player1.id}]
                    </ReadyName>
                  ) : (
                    <UserName team={true}>
                      {waitingUsers.player1.nickname}[{waitingUsers.player1.id}]
                    </UserName>
                  )}
                </User1>
              ) : (
                <User1
                  onClick={() => {
                    changeTeam(1);
                  }}
                >
                  <XUserImg team={true} />
                  <UserName team={true}>???</UserName>
                </User1>
              )}
              {waitingUsers.player3 ? (
                <User2>
                  <UserImg team={true} />
                  {waitingUsers?.player3?.ready ? (
                    <ReadyName team={true}>
                      {waitingUsers.player3.nickname}[{waitingUsers.player3.id}]
                    </ReadyName>
                  ) : (
                    <UserName team={true}>
                      {waitingUsers.player3.nickname}[{waitingUsers.player3.id}]
                    </UserName>
                  )}
                </User2>
              ) : (
                <User2
                  onClick={() => {
                    changeTeam(3);
                  }}
                >
                  <XUserImg team={true} />
                  <UserName team={true}>???</UserName>
                </User2>
              )}
            </TeamBox>
            <VsBox>
              <VSImg />
              <SwitImg />
              <span>팀을 교체하려면</span>
              <span>빈칸을 누르세요.</span>
              <DefaultBtnL
                style={{ marginTop: "1.56vw" }}
                disabled={readyUser}
                onClick={readyHandler}
              >
                {readyUser ? <span>준비 완료</span> : <span>게임 준비</span>}
              </DefaultBtnL>
            </VsBox>
            <TeamBox team={false}>
              <TeamHeader team={false}>
                <span>● Team Brown ●</span>
              </TeamHeader>
              {waitingUsers.player2 ? (
                <User2>
                  <UserImg team={false} />
                  {waitingUsers?.player2?.ready ? (
                    <ReadyName team={false}>
                      {waitingUsers.player2.nickname}[{waitingUsers.player2.id}]
                    </ReadyName>
                  ) : (
                    <UserName team={false}>
                      {waitingUsers.player2.nickname}[{waitingUsers.player2.id}]
                    </UserName>
                  )}
                </User2>
              ) : (
                <User2
                  onClick={() => {
                    changeTeam(2);
                  }}
                >
                  <XUserImg team={false} />
                  <UserName team={false}>???</UserName>
                </User2>
              )}
              {waitingUsers.player4 ? (
                <User1>
                  <UserImg team={false} />
                  {waitingUsers?.player4?.ready ? (
                    <ReadyName team={false}>
                      {waitingUsers.player4.nickname}[{waitingUsers.player4.id}]
                    </ReadyName>
                  ) : (
                    <UserName team={false}>
                      {waitingUsers.player4.nickname}[{waitingUsers.player4.id}]
                    </UserName>
                  )}
                </User1>
              ) : (
                <User1
                  onClick={() => {
                    changeTeam(4);
                  }}
                >
                  <XUserImg team={false}></XUserImg>
                  <UserName team={false}>???</UserName>
                </User1>
              )}
            </TeamBox>
          </TeamWrap>
        )}
      </WaitingWrap>
    </>
  );
};

export default WaitingRoom;
