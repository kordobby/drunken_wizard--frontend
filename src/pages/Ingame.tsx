import React, { useCallback, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import stompJS from "stompjs";

import {
  setThisPlayerTK,
  setTeamPlayerTK,
  setEnemyPlayerATK,
  setEnemyPlayerBTK,
  setMyCardsTK,
  setNowPlayerTK,
  setCraveTK,
  addBonusCardTK,
  setSelectedCardsTK,
} from "../redux/modules/ingameSlice";

import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/tsHooks";

import { getCookie } from "../Shared/Cookies";

import PlayerField from "../Components/IngameComponents/PlayerField/PlayerField";
import DrawModal from "../Components/IngameComponents/Modals/DrawModal";
import MainField from "../Components/IngameComponents/MainField/MainField";
import NoticeField from "../Components/IngameComponents/NoticeField/NoticeField";
import StartModal from "../Components/IngameComponents/Modals/StartModal";

import { StGameWrap } from "../Components/IngameComponents/InGameStyled";

/* Page Components */
const Ingame = () => {
  /* useState */
  // about turn control
  const [status, setStatus] = useState<string>("");

  // 카드 선택하는 모달 창
  const [drawModalOpen, setDrawModalOpen] = useState<boolean>(false);

  // 선택 가능한 카드 카운트 & 카드 목록
  const [selectableCnt, setSelectableCnt] = useState<number>(0);
  const [selectableCard, setSelectableCard] = useState<any[]>([]);
  const [selectedCardName, setSelectedCardName] = useState<string>("");

  // 선택 가능한 갯수가 되면 카드 선택버튼 비활성화 (취소 누르면 돌아옴)
  const [drawDisabled, setDrawDisabled] = useState<boolean>(false);

  // 소켓으로 보내줄 선택된 카드
  const [selectedCard, setSelectedCard] = useState<object[]>([]);

  /* action turn :: card-use, discard */
  // USECARD & DISCARD
  const [selectUseCard, setSelectUseCard] = useState<any>("");
  const [findTargetGroup, setFindTargetGroup] = useState<string>("");
  const [selectTarget, setSelectTarget] = useState<number>(0);

  // 사용해서 무덤으로 보낸 카드!
  const [cardCrave, setCardCrave] = useState<string>("");

  const [update, setUpdate] = useState<any>([]);

  /* tookit things */
  const dispatch = useAppDispatch();
  const playersData = useAppSelector((state) => state.game.players);
  const myCards = useAppSelector((state) => state.game.myCards);
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayer);
  const cardTarget = useAppSelector((state) => state.game.game.targetPlayer);

  /* socket connect - token */
  const socket = new SockJS("http://13.124.63.214/SufficientAmountOfAlcohol");
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const { roomid } = useParams();
  const myId = Number(getCookie("id"));

  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, []);

  const socketSubscribe = () => {
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
              dispatch(setNowPlayerTK(findNowPlayer[0].username));
              // #2 로그인 유저의 게임 정보 저장
              const myPlayerInfo = playersInfo.filter(
                (value: any) => value.playerId === myId
              );
              // toolkit
              dispatch(setThisPlayerTK(myPlayerInfo[0]));
              switch (myPlayerInfo[0].turnOrder) {
                case 1:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 3
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 2
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 4
                      )[0]
                    )
                  );
                  break;
                case 2:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 4
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 1
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 3
                      )[0]
                    )
                  );
                  break;
                case 3:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 1
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 2
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 4
                      )[0]
                    )
                  );
                  break;
                case 4:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 2
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 1
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 3
                      )[0]
                    )
                  );
                  break;
                default:
                  break;
              }
              setStatus("START");
              break;
            case "PRECHECK":
              console.log("precheck 들어왔다!");
              // 여기는 나중에 작업할 예정 => 게임 종료 시 작업
              if (msgData.gameOver === true) {
                console.log("게임이 끝이났습니다.");
              } else if (msgData.player.dead === true) {
                // 죽었을 때는 어떻게 할지? 논의 안해봄
                console.log("플레이어가 죽었습니다.");
                // setStatus("ENDTURN") or setStatus("DEAD") or ????
                // 디자이너님한테 죽었을 때 초상화 변화 여쭤보기
                setStatus("WAITING");
              } else if (msgSender === myId && msgData.player.dead === false) {
                // 만약 플레이어가 죽지 않았다면, 플레이어 스탯 업데이트하고 카드 드로우해도 되는지 확인
                dispatch(setThisPlayerTK(msgData.player));
                setStatus("PRECHECK");
              } else if (msgSender !== myId) {
                // 만약 이 플레이어가 현재 플레이어가 아니라면 대기
                setStatus("WAITING");
              }
              break;
            case "DRAW":
              if (msgSender === myId) {
                // 선택가능한 카드 수와 종류 저장
                setSelectableCard(msgData.cardDrawed);
                setSelectableCnt(msgData.selectable);
                setStatus("DRAW");
              }
              break;
            case "SELECT":
              ClearTimer();
              setDrawModalOpen(false);
              if (msgSender === myId && msgData.drawSuccess === true) {
                // 문구 띄워줘야하면 status 추가
                dispatch(addBonusCardTK(msgData.card));
                setStatus("DRAWSUCCESS");
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              } else if (msgSender === myId && msgData.drawSuccess === false) {
                // 문구 띄워줘야하면 status 추가
                dispatch(setCraveTK(msgData.card.cardName));
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              }
              break;
            case "TURNCHECK":
              ClearTimer();
              if (msgSender === myId) {
                console.log("액션턴 시작");
                ActionTimer();
              }
              break;
            case "ENDDRAW":
              setDrawModalOpen(false);
              if (msgSender === myId) {
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              }
              break;
            case "USECARD":
              console.log("성공");

              // 카드 셋팅
              setUpdate(msgData.players);
              setStatus("USECARD");

              break;
            case "ENDTURN":
              ClearTimer();
              dispatch(setNowPlayerTK(msgData.nextPlayerId.usename));
              dispatch(setThisPlayerTK(msgData.player));
              setStatus("CHANGETURN");
              break;
            default:
              break;
          }
        });
      }
    );
  };

  const socketUnsubscribe = React.useCallback(() => {
    try {
      stompClient.unsubscribe("sub-0");
      console.log("success to unsubscribe");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    switch (status) {
      case "READY":
        setTimeout(() => {
          sendStompMsgFunc("1", myId, "START", null);
        }, 3000);
        break;
      case "GREETING":
        setTimeout(() => {
          setStatus("START");
        }, 7000);
        break;
      case "WAITING":
        console.log("아직 내 턴이 아니옵니다.");
        break;
      case "START":
        console.log(nowPlayer);
        console.log(playersData.thisPlayer.username);
        if (nowPlayer === playersData.thisPlayer.username) {
          sendStompMsgFunc("1", myId, "PRECHECK", null);
        } else {
          setStatus("WAITING");
        }
        break;
      case "PRECHECK":
        sendStompMsgFunc("1", myId, "DRAW", null);
        break;
      case "DRAW":
        setDrawModalOpen(true);
        setDrawDisabled(false);
        drawTimer();
        break;
      case "ACTION":
        setSelectedCard([]);
        break;
      case "USECARD":
        setStatus("USECARDSUCCESS");
        break;
      case "USECARDSUCCESS":
        console.log(update);
        console.log("여기");
        console.log(playersData.thisPlayer);
        const thisPlayer = update.filter(
          (value: any) =>
            Number(value.playerId) === Number(playersData.thisPlayer.playerId)
        );
        console.log(thisPlayer);
        dispatch(setThisPlayerTK(thisPlayer[0]));
        console.log(thisPlayer[0].cardsOnHand);
        dispatch(setMyCardsTK(thisPlayer[0].cardsOnHand));

        const teamPlayer = update.filter(
          (value: any) => value.playerId === playersData.teamPlayer.playerId
        );
        const enemyA = update.filter(
          (value: any) => value.playerId === playersData.enemyPlayerA.playerId
        );
        const enemyB = update.filter(
          (value: any) => value.playerId === playersData.enemyPlayerB.playerId
        );
        console.log(thisPlayer[0], enemyA[0], enemyB[0]);
        if (teamPlayer[0] !== undefined) {
          dispatch(setTeamPlayerTK(teamPlayer[0]));
        }
        if (enemyA[0] !== undefined) {
          dispatch(setEnemyPlayerATK(enemyA[0]));
        }
        if (enemyB[0] !== undefined) {
          dispatch(setEnemyPlayerBTK(enemyB[0]));
        }
        setSelectTarget(0);
        setFindTargetGroup("");
        break;
      case "CHANGETURN":
        if (nowPlayer === playersData.thisPlayer.username) {
          sendStompMsgFunc("1", myId, "PRECHECK", null);
        } else {
          setStatus("WAITING");
        }
        break;
      default:
        break;
    }
  }, [status]);

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

  const sendStompMsgFunc = (
    roomId: string,
    sender: number,
    msgType: string,
    data: object | null
  ) => {
    waitForConnection(stompClient, function () {
      stompClient.send(
        "/pub/game/1",
        { token: accessToken },
        JSON.stringify({
          roomId: roomId,
          sender: sender,
          content: JSON.stringify(data),
          type: msgType,
        })
      );
    });
  };

  /* DRAW => SELECT */
  // 드로우할 카드 배열 만드는 함수
  const selectCardDrawTurnHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newSelectedCard: any[] = [...selectedCard];
    const targetId = (event.target as HTMLButtonElement).id;
    const setNew = newSelectedCard.push(targetId);
    const removeDup = newSelectedCard.filter(
      (value, index) => newSelectedCard.indexOf(value) === index
    );
    setSelectedCard(removeDup);
  };

  // 드로우할 카드 취소하는 함수
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

  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  const drawTimer = () => {
    timer.current = setTimeout(() => {
      setDrawModalOpen(false);
      sendStompMsgFunc("1", myId, "SELECT", null);
      alert("시간초과!");
    }, 10000);
  };

  const ActionTimer = () => {
    timer.current = setTimeout(() => {
      alert("시간초과!");
      sendStompMsgFunc("1", myId, "ENDTURN", null);
    }, 30000);
  };
  const ClearTimer = () => {
    console.log("된다");
    window.clearTimeout(timer.current || 0);
  };

  useEffect(() => {
    if (selectableCnt === selectedCard.length) {
      setDrawDisabled(true);
    } else {
      setDrawDisabled(false);
    }
  }, [selectedCard]);
  console.log(selectedCard);
  const selectTurnController = () => {
    const cardsMaker = selectedCard.map(function (value: any) {
      const selectedCardsObj = { cardId: 0 };
      selectedCardsObj.cardId = Number(value);
      return selectedCardsObj;
    });
    const confirmDrawCards = selectedCard.map((value) =>
      selectableCard.find((elem) => Number(elem.cardId) === Number(value))
    );
    console.log(selectedCard);
    console.log(confirmDrawCards);
    console.log(cardsMaker);
    dispatch(setMyCardsTK(confirmDrawCards));
    const data = {
      selectedCards: cardsMaker,
    };
    sendStompMsgFunc("1", myId, "SELECT", data);
    setStatus("SELECT");
  };

  const selectUseCardHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cardId = (event.target as HTMLButtonElement).id;
    const targetGroup = (event.target as HTMLButtonElement).className;
    const cardName = (event.target as HTMLButtonElement).name;
    setCardCrave(cardName);
    setSelectUseCard(Number(cardId));
    setSelectedCardsTK(Number(cardId));
    setFindTargetGroup(targetGroup);
    const targetName = (event.target as HTMLButtonElement).name;
    setSelectedCardName(targetName);
  };

  const sendUseCardHandler = () => {
    console.log(findTargetGroup);
    if (findTargetGroup === "SELECT" && cardTarget === 0) {
      alert("타겟을 설정해주세요!");
      return;
    }
    // 여기는 잘 돌아가는데, 일부 카드에서는 돌아가지 않음
    if (findTargetGroup === "SELECT") {
      console.log("한 사람만 선택합니다.");
      const data = {
        targetPlayerId: Number(cardTarget),
        cardId: selectUseCard,
      };
      sendStompMsgFunc("1", myId, "USECARD", data);
    } else {
      // 여기는 아예 안먹힘. targetPlayerId 뭐라고 보낼지?
      console.log("SELECT 이외의 경우입니다.");
      const data = {
        targetPlayerId: null,
        cardId: selectUseCard,
      };
      sendStompMsgFunc("1", myId, "USECARD", data);
    }
    setFindTargetGroup("");
    setSelectedCardName("");
  };

  const selectDisCardHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cardId = (event.target as HTMLButtonElement).id;
    const cardName = (event.target as HTMLButtonElement).name;
    dispatch(setCraveTK(cardName));
    const data = {
      cardId: Number(cardId),
    };
    sendStompMsgFunc("1", myId, "DISCARD", data);
    const myCardsSet = [...myCards];
    console.log(myCardsSet);
    console.log(cardId);
    const updateCards = myCardsSet.filter(
      (value: any) => Number(value.cardId) !== Number(cardId)
    );
    dispatch(setMyCardsTK(updateCards));
    setFindTargetGroup("");
    setSelectUseCard("");
    setSelectTarget(0);
  };

  return (
    <>
      {status === "" && <StartModal setStatus={setStatus}></StartModal>}
      <StGameWrap>
        <NoticeField status={status}></NoticeField>
        <MainField></MainField>
        <PlayerField
          setFindTargetGroup={setFindTargetGroup}
          findTargetGroup={findTargetGroup}
          selectUseCardHandler={selectUseCardHandler}
          sendUseCardHandler={sendUseCardHandler}
          selectDisCardHandler={selectDisCardHandler}
          setSelectTarget={setSelectTarget}
          sendStompMsgFunc={sendStompMsgFunc}
          selectedCardName={selectedCardName}
        ></PlayerField>
        {drawModalOpen && (
          <DrawModal
            id={0}
            selectCardDrawTurnHandler={selectCardDrawTurnHandler}
            cancelCardDrawTurnHandler={cancelCardDrawTurnHandler}
            selectTurnController={selectTurnController}
            selectedCard={selectedCard}
            selectableCard={selectableCard}
            drawDisabled={drawDisabled}
            setDrawModalOpen={setDrawModalOpen}
          ></DrawModal>
        )}
        <button
          onClick={() => {
            sendStompMsgFunc("1", myId, "ENDGAME", null);
          }}
        >
          게임 종료
        </button>
      </StGameWrap>
    </>
  );
};
export default Ingame;
