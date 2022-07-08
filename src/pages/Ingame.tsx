import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import stompJS from "stompjs";

import { getCookie } from "../Shared/Cookies";
import PlayerField from "../Components/IngameComponents/PlayerField/PlayerField";
import DrawModal from "../Components/IngameComponents/Modals/DrawModal";
import { stringify } from "querystring";

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
  const [teamPlayer, setTeamPlayer] = useState<any>({});
  const [enemyPlayerA, setEnemyPlayerA] = useState<any>({});
  const [enemyPlayerB, setEnemyPlayerB] = useState<any>({});

  /* card draw setup */
  // 카드 선택하는 모달 창
  const [drawModalOpen, setDrawModalOpen] = useState<boolean>(false);
  // 선택 가능한 카드 카운트 & 카드 목록
  const [selectableCnt, setSelectableCnt] = useState<number>(0);
  const [selectableCard, setSelectableCard] = useState<any[]>([]);
  // 선택 가능한 갯수가 되면 카드 선택버튼 비활성화 (취소 누르면 돌아옴)
  const [drawDisabled, setDrawDisabled] = useState<boolean>(false);

  // 소켓으로 보내줄 선택된 카드
  const [selectedCard, setSelectedCard] = useState<object[]>([]);

  // 추가 드로우 성공한 카드
  const [bonusCard, setBonusCard] = useState<object>({});

  /* action turn :: card-use, discard */
  // USECARD & DISCARD
  const [selectUseCard, setSelectUseCard] = useState<any>("");
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
              if (msgData.gameOver === true) {
                console.log("게임이 끝이났습니다.");
                // endgame으로 가야함
                // setStatus("ENDGAME");
              } else if (msgSender == myId && msgData.gameOver === false) {
                console.log("내 차례가 맞습니다.");
                setThisPlayer(msgData.player);
                setStatus("PRECHECK");
              } else if (msgSender !== myId && msgData.gameOver === false) {
                // 현재 진행중인 플레이어의 status를 바꿔줘야함 잊고있었네
                setStatus("HEAVEN");
                console.log("다른 플레이어가 게임을 하고있습니다.");
              } else {
                console.log("nonononono");
              }
              break;
            case "DRAW":
              console.log("넘어왔다.");
              if (msgSender == myId) {
                console.log(msgData);
                console.log("카드를 드로우합니다.");
                setSelectableCard(msgData.cardDrawed);
                setSelectableCnt(msgData.selectable);
                setDrawModalOpen(true);
                setDrawDisabled(false);
                setStatus("HEAVEN");
              } else {
                setStatus("HEAVEN");
              }
              break;
            case "SELECT":
              setDrawModalOpen(false);
              console.log("추가 드로우가 있었단다");
              console.log(myCards);
              if (msgSender === Number(myId) && msgData.drawSuccess === true) {
                console.log("카드 드로우 성공");
                setBonusCard(msgData.card);
                setStatus("DRAWSUCCESS");
              } else if (
                msgSender === Number(myId) &&
                msgData.drawSuccess === false
              ) {
                console.log(msgData);
                console.log("카드 드로우 실패");
              } else if (msgSender !== Number(myId)) {
                setStatus("HOHO");
              }
              break;
            case "ENDDRAW":
              setDrawModalOpen(false);
              console.log("더이상 드로우는 없습니다.");
              setStatus("DRAW");
              // send action turn check
              break;
            case "USECARD":
              setStatus("USECARDSUCCESS");
              console.log("카드사용 결과는?");
              break;
            case "DISCARD":
              //msgData = {cardId:2}
              break;
            case "ENDTURN":
              setNowPlayer(msgData.nextPlayerId);
              setThisPlayer(msgData.player);
              break;
            default:
              break;
          }
        });
      }
    );
  }, []);

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
        console.log("프리턴 플레이어를 확인합니다.");
        sendStompMsg("DRAW");
        break;
      case "DRAWSUCCESS":
        // bonusCard success
        const newCardSet = [...myCards];
        const copyBonusCard = bonusCard;
        const newCardPlz = newCardSet.push(copyBonusCard);
        setMyCards(newCardSet);
        // send action turn check after 5 sec
        sendStompMsg("TURNCHECK");
        break;
      case "DRAWFAIL":
        // send action turn check after 5 sec
        sendStompMsg("TURNCHECK");
        break;
      case "ENDDRAW":
        // send action turn check after 5 sec
        sendStompMsg("TURNCHECK");
        break;
      case "USECARDSUCCESS":
        const myCardsSet = [...myCards];
        const updateCards = myCardsSet.filter(
          (value: any) => value.cardId == selectUseCard
        );
        setMyCards(updateCards);
        // clear 작업
        setSelectUseCard("");
        setSelectTarget("");
        setFindTargetGroup("");
        break;
      default:
        break;
    }
  }, [status]);

  // button 을 눌러서 게임 시작 요청 보내기 (send)
  const readyTurnController = () => {
    setStatus("READY");
  };

  // send stompMsg
  function waitForConnection(stompClient: stompJS.Client, callback: any) {
    setTimeout(function () {
      if (stompClient.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 1);
  }

  const sendStompMsg = (data: string) => {
    console.log(`sendMsgs to change turn to ${data}`);
    // stompMsg
    waitForConnection(stompClient, function () {
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
    });
  };

  // ready for "SELECT"
  const selectCardDrawTurnHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newSelectedCard: any[] = [...selectedCard];
    const { target } = event;
    const targetId = (event.target as HTMLButtonElement).id;
    const setNew = newSelectedCard.push(Number(targetId));
    const removeDup = newSelectedCard.filter(
      (value, index) => newSelectedCard.indexOf(value) === index
    );
    setSelectedCard(removeDup);
  };
  const cancelCardDrawTurnHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newSelectedCard = [...selectedCard];
    const target = (event.target as HTMLButtonElement).id;
    const setNew = newSelectedCard.filter(
      (value) => Number(value) !== Number(target)
    );
    setSelectedCard(setNew);
  };

  useEffect(() => {
    if (selectableCnt === selectedCard.length) {
      setDrawDisabled(true);
    } else {
      setDrawDisabled(false);
    }
  }, [selectedCard]);

  const selectTurnController = () => {
    // data setting
    const cardsMaker = selectedCard.map(function (value: any) {
      const selectedCardsObj = { cardId: 0 };
      selectedCardsObj.cardId = value;
      return selectedCardsObj;
    });

    // confirm my cardsList
    const confirmDrawCards = selectedCard.map((value) =>
      selectableCard.find((elem) => elem.cardId === value)
    );

    setMyCards(confirmDrawCards);
    const data = {
      selectedCards: cardsMaker,
    };

    // send msg to select
    stompClient.send(
      "/pub/game/1",
      { token: accessToken },
      JSON.stringify({
        roomId: "1",
        sender: Number(myId),
        content: JSON.stringify(data),
        type: "SELECT",
      })
    );
    setStatus("SELECT");
  };

  const selectUseCardHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cardId = (event.target as HTMLButtonElement).id;
    const targetGroup = (event.target as HTMLButtonElement).className;
    // 카드의 이름과 타겟그룹을 저장
    setSelectUseCard(Number(cardId));
    setFindTargetGroup(targetGroup);
    console.log(cardId);
    console.log(targetGroup);
  };

  const sendUseCardHandler = () => {
    if (selectTarget === "") {
      alert("타겟을 설정해주세요!");
    } else {
      const data = {
        targetPlayerId: String(selectTarget),
        cardId: String(selectUseCard),
      };
      stompClient.send(
        "/pub/game/1",
        { token: accessToken },
        JSON.stringify({
          roomId: "1",
          sender: Number(myId),
          content: JSON.stringify(data),
          type: "USECARD",
        })
      );
      // 카드 사용 결과 msg 올 때 카드리스트 최신화해야겠다.
    }
  };

  const selectDisCardHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cardId = (event.target as HTMLButtonElement).id;
    setSelectUseCard(cardId);
    const data = {
      cardId: selectUseCard,
    };
    stompClient.send(
      "/pub/game/1",
      { token: accessToken },
      JSON.stringify({
        roomId: "1",
        sender: Number(myId),
        content: JSON.stringify(data),
        type: "DISCARD",
      })
    );
    const myCardsSet = [...myCards];
    const updateCards = myCardsSet.filter(
      (value: any) => value.cardId == cardId
    );
    setMyCards(updateCards);
    setSelectUseCard("");
    setSelectTarget("");
    setFindTargetGroup("");
  };

  return (
    <>
      <span>{status}</span>
      {nowPlayer && <span>{nowPlayer}님의 차례입니다.</span>}
      <button onClick={readyTurnController}>sendStart</button>
      <PlayerField
        findTargetGroup={findTargetGroup}
        myCards={myCards}
        selectUseCardHandler={selectUseCardHandler}
        sendUseCardHandler={sendUseCardHandler}
        selectDisCardHandler={selectDisCardHandler}
        enemyPlayerA={enemyPlayerA.playerId}
        enemyPlayerB={enemyPlayerB.playerId}
        teamPlayer={teamPlayer.playerId}
        thisPlayer={thisPlayer.playerId}
        setSelectTarget={setSelectTarget}
        sendStompMsg={sendStompMsg}
      ></PlayerField>
      {drawModalOpen && (
        <DrawModal
          id={3}
          selectCardDrawTurnHandler={selectCardDrawTurnHandler}
          cancelCardDrawTurnHandler={cancelCardDrawTurnHandler}
          selectTurnController={selectTurnController}
          selectedCard={selectedCard}
          selectableCard={selectableCard}
          drawDisabled={drawDisabled}
        ></DrawModal>
      )}
    </>
  );
};
export default Ingame;
