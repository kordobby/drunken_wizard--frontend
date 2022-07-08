import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import stompJS from "stompjs";

import { getCookie } from "../Shared/Cookies";

const Ingame = () => {
  /* socket connect - token */
  const socket = new SockJS("http://13.124.63.214/SufficientAmountOfAlcohol");
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const { roomid } = useParams();
  const myId = getCookie("id");

  /* about turn control */
  const [status, setStatus] = useState<string>("");
  const [nowPlayer, setNowPlayer] = useState<string>("");

  /* about players */
  const [thisPlayer, setThisPlayer] = useState<any>({});
  const [myCards, setMyCards] = useState<object[]>([]);
  const [teamPlayer, setTeamPlayer] = useState<object>({});
  const [enemyPlayerA, setEnemyPlayerA] = useState<object>({});
  const [enemyPlayerB, setEnemyPlayerB] = useState<object>({});

  /* card draw setup */
  // 카드 선택하는 모달 창
  const [drawModalOpen, setDrawModalOpen] = useState<boolean>(false);
  // 선택 가능한 카드 카운트 & 카드 목록
  const [selectableCnt, setSelectableCnt] = useState<number>(0);
  const [selectableCard, setSelectableCard] = useState<object[]>([]);
  // 선택 가능한 갯수가 되면 카드 선택버튼 비활성화 (취소 누르면 돌아옴)
  const [drawDisabled, setDrawDisabled] = useState<boolean>(false);

  // 소켓으로 보내줄 선택된 카드
  const [selectedCard, setSelectedCard] = useState<object[]>([]);

  /* action turn :: card-use, discard */
  // USECARD & DISCARD
  const [selectUseCard, setSelectUseCard] = useState<string>("");
  const [findTargetGroup, setFindTargetGroup] = useState<string>("");
  const [selectTarget, setSelectTarget] = useState<string>("");
  // 사용해서 무덤으로 보낸 카드!
  const [cardCrave, setCardCrave] = useState<string>("");

  useEffect(() => {
    stompClient.connect(
      {
        token: accessToken,
      },
      () => {
        stompClient.subscribe("/sub/game/1", (data: any) => {
          console.log(data);
          const response = JSON.parse(data.body);
          const msgType = response?.type;
          const msgData = JSON.parse(response?.content);
          console.log(msgData);
          const msgSender = response?.sender;
          const playersInfo = msgData.players;
          switch (msgType) {
            case "START":
              // #1 첫 번째 턴인 유저를 찾아 nowPlayer에 저장
              const findNowPlayer = playersInfo.filter(
                (value: any) => value.turnOrder === 1
              ); // 나중에 받는 데이터보고 타입 지정해주자***
              setNowPlayer(findNowPlayer[0].playerId);
              // #2 로그인 유저의 게임 정보 저장
              const myPlayerInfo = playersInfo.filter(
                (value: any) => value.playerId === Number(myId)
              );
              setThisPlayer(myPlayerInfo[0]);
              setStatus("READY");
              switch (myPlayerInfo[0].turnOrder) {
                case 1:
                  setTeamPlayer(
                    playersInfo.filter((value: any) => value.turnOrder === 3)[0]
                  );
                  setEnemyPlayerA(
                    playersInfo.filter((value: any) => value.turnOrder === 2)[0]
                  );
                  setEnemyPlayerB(
                    playersInfo.filter((value: any) => value.turnOrder === 4)[0]
                  );
                  break;
                case 2:
                  setTeamPlayer(
                    playersInfo.filter((value: any) => value.turnOrder === 4)[0]
                  );
                  setEnemyPlayerA(
                    playersInfo.filter((value: any) => value.turnOrder === 1)[0]
                  );
                  setEnemyPlayerB(
                    playersInfo.filter((value: any) => value.turnOrder === 3)[0]
                  );
                  break;
                case 3:
                  setTeamPlayer(
                    playersInfo.filter((value: any) => value.turnOrder === 1)[0]
                  );
                  setEnemyPlayerA(
                    playersInfo.filter((value: any) => value.turnOrder === 2)[0]
                  );
                  setEnemyPlayerB(
                    playersInfo.filter((value: any) => value.turnOrder === 4)[0]
                  );
                  break;
                case 4:
                  setTeamPlayer(
                    playersInfo.filter((value: any) => value.turnOrder === 2)[0]
                  );
                  setEnemyPlayerA(
                    playersInfo.filter((value: any) => value.turnOrder === 1)[0]
                  );
                  setEnemyPlayerB(
                    playersInfo.filter((value: any) => value.turnOrder === 3)[0]
                  );
                  break;
                default:
                  break;
              }
              console.log("정보 저장 완료");
              console.log(findNowPlayer[0].playerId);
              console.log(myPlayerInfo[0].playerId);
              // #4. 첫 턴 시작이라면 프리턴 메세지 보내기
              // 그게 아니라면 대기
              if (findNowPlayer[0].playerId === myPlayerInfo[0].playerId) {
                // sendMsg to "PRECHECK";
                setStatus("START");
                console.log("내가 지금 플레이어임");
              } else {
                // 내 턴이 아닐 때는 아예 다른 턴으로 보내는게 맞는 것 같음!
                setStatus("HEAVEN");
                console.log("아니니까쉬고있자");
              }
              break;
            case "PRECHECK":
              // 게임이 끝났을 때
              // 게임이 진행될 때, => 나 / 다른 사람
              console.log("precheck 들어왔다!");
              console.log(msgSender);
              console.log(response);
              console.log(myId);
              if (msgData.gameOver === true) {
                console.log("게임이 끝이났습니다.");
                // endgame으로 가야함
                // setStatus("ENDGAME");
              } else if (
                msgSender === thisPlayer.playerId &&
                msgData.gameOver === false
              ) {
                console.log("내 차례가 맞습니다.");
                setThisPlayer(msgData.player);
                sendStompMsg("PRECHECK");
                setStatus("DRAW");
              } else if (
                msgSender !== thisPlayer.playerId &&
                msgData.gameOver === false
              ) {
                // 현재 진행중인 플레이어의 status를 바꿔줘야함 잊고있었네
                setStatus("HEAVEN");
                console.log("다른 플레이어가 게임을 하고있습니다.");
              }
              break;
            // case "DRAW":
            //   if (msgSender === myId && thisPlayer === myId) {
            //     console.log("카드를 드로우합니다.");
            //     setMyCards(msgData.cardDrawed);
            //   }
            default:
              break;
          }
        });
      }
    );
  }, []);

  console.log(thisPlayer);
  useEffect(() => {
    switch (status) {
      case "READY":
        console.log("waiting for game-start");
        // send stompMsg "" after 5 sec
        // show notice " 곧 게임이 시작됩니다!"
        setTimeout(() => {
          sendStompMsg("START");
        }, 1000);
        // start msg를 받으면 status change => "START"
        break;
      case "START":
        // 클래스와 순서를 확인하세요.
        setTimeout(() => {
          // send stompMsg "" after 5 sec
          sendStompMsg("PRECHECK");
          console.log("게임이 시작됩니다.");
        }, 2000);
        break;
      case "PRECHECK":
        // send stompMsg "" after 5 sec
        // sendStopmMsg("DRAW");
        console.log("프리턴 플레이어를 확인합니다.");
        break;
      default:
        break;
    }
  }, [status]);

  // button 을 눌러서 게임 시작 요청 보내기 (send)
  const readyTurnController = () => {
    setStatus("READY");
  };

  const sendStompMsg = (data: string) => {
    // stompMsg
    stompClient.send(
      "/pub/game/1",
      { token: accessToken },
      JSON.stringify({
        roomId: "1",
        sender: Number(myId),
        content: null,
        type: data,
      })
    );
    console.log(`sendMsgs to change turn to ${data}`);
  };
  return (
    <>
      <span>{status}</span>
      {nowPlayer && <span>{nowPlayer}님의 차례입니다.</span>}
      <button onClick={readyTurnController}>sendStart</button>
    </>
  );
};
export default Ingame;
