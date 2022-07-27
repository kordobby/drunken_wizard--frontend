/* Package */
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import stompJS from "stompjs";
import { useParams } from "react-router-dom";

/* Hooks */
import { useAppSelector, useAppDispatch } from "../hooks/tsHooks";

/* Modules */
import {
  setRoomTitleTK,
  setCraveTK,
  setNowPlayerIdTK,
  setThisPlayerTK,
  setPlayOrderTK,
  setPlayerATK,
  setPlayerBTK,
  setPlayerCTK,
  updateMyCardsTK,
  setSelectableCardCnt,
  setNowPlayerNameTK,
  setTimerTK,
  setSelectableCardTK,
  setMyCardsUpdateTK,
  clearDrawCardsTK,
} from "../redux/modules/ingameSlice";

/* Cookies */
import { getCookie } from "../shared/Cookies";

/* Components */
import PlayerField from "../Components/IngameComponents/PlayerField/PlayerField";
import DrawModal from "../Components/IngameComponents/Modals/DrawModal";
import NoticeField from "../Components/IngameComponents/NoticeField/NoticeField";
import StartModal from "../Components/IngameComponents/Modals/StartModal";
import PlayerIcons from "../Components/IngameComponents/MainField/PlayerIcons";
import CraveField from "../Components/IngameComponents/MainField/CraveField";
import PlayerStatus from "../Components/IngameComponents/MainField/PlayerStatus";

/* CSS & SC */
import {
  StGameWrap,
  MainWrap,
  StGameWrapFilter,
} from "../Components/IngameComponents/InGameStyled/InGameStyled";
import { playersSetting } from "../typings/typedb";
import AlertPopUp from "../Components/IngameComponents/InGameCommon/AlertPopUp";

const Ingame = () => {
  /* useState */
  // #GAME :: Turn Ctrl
  const [status, setStatus] = useState<string>("");

  // #DRAW-TURN :: Modal Ctrl
  const [drawModalOpen, setDrawModalOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<playersSetting[]>([]);
  const [updateOne, setUpdateOne] = useState<playersSetting>({
    cardsOnHand: [],
    charactorClass: "",
    playerId: 0,
    health: 0,
    username: "",
    dead: false,
    mana: 0,
    manaCostModifierDuration: 0,
    mutedDuration: 0,
    petrifiedDuration: 0,
    poisonedDuration: 0,
    shield: false,
    sleepDuration: 0,
    stunnedDuration: 0,
    team: false,
    turnOrder: 0,
    weakDuration: 0,
    damageModifierDuration: 0,
  });

  /* modal control  */
  const [startModal, setStartModal] = useState<boolean>(false);
  const [drawFailModal, setDrawFailModal] = useState<boolean>(false);
  const [timeOutModal, setTimeOutModal] = useState<boolean>(false);

  /* targetText */
  const [targetText, setTargetText] = useState<string>("깅준호");

  /* tookit things */
  const dispatch = useAppDispatch();
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);
  const nowPlayerId = useAppSelector((state) => state.game.game.nowPlayerId);
  const nowPlayerName = useAppSelector((state) => state.game.game.nowPlayer);
  const craveCard = useAppSelector((state) => state.game.game.cardCrave[0]);
  const API_URL = process.env.REACT_APP_API_URL;
  /* socket connect - token */
  const socket = new SockJS(`${API_URL}SufficientAmountOfAlcohol`);
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const { roomId } = useParams();
  const myId = Number(getCookie("id"));

  const doNotReload = (event: any) => {
    if (
      (event.ctrlKey === true &&
        (event.keyCode === 78 || event.keyCode === 82)) ||
      event.keyCode === 116
    ) {
      return window.confirm("새로고침하면 게임이 정상작동하지 않아요:(");
    }
  };

  useEffect(() => {
    document.onkeydown = doNotReload;
  });

  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, []);

  const socketUnsubscribe = React.useCallback(() => {
    try {
      stompClient.unsubscribe("sub-0");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const socketSubscribe = () => {
    stompClient.connect(
      {
        token: accessToken,
      },
      () => {
        stompClient.subscribe(`/sub/game/${roomId}`, (data: any) => {
          console.log(data);
          const response = JSON.parse(data.body);
          const msgData = JSON.parse(response?.content);
          const msgSender = response?.sender;
          const playersInfo = msgData.players;
          switch (response?.type) {
            case "START":
              stompClient.unsubscribe(`/sub/wroom/${roomId}`);

              const setPlayerOrder = playersInfo.sort(
                (a: playersSetting, b: playersSetting) =>
                  a.turnOrder - b.turnOrder
              );
              const playerOrder = setPlayerOrder.map(
                (value: playersSetting) => value.username
              );
              dispatch(setRoomTitleTK(msgData.roomName));
              dispatch(setPlayOrderTK(playerOrder));
              dispatch(setNowPlayerIdTK(setPlayerOrder[0].playerId));
              dispatch(setNowPlayerNameTK(setPlayerOrder[0].username));

              // 유지
              const myPlayerInfo = playersInfo.filter(
                (value: playersSetting) => value.playerId === myId
              );
              dispatch(setThisPlayerTK(myPlayerInfo[0]));
              const restPlayersInfo = playersInfo.filter(
                (value: playersSetting) => value.playerId !== myId
              );

              restPlayersInfo.sort((value: playersSetting) => {
                return value.team ? -1 : 1;
              });

              /* 팀에 따른 플레이어 구분, 같은 팀원 : PlayerA */
              if (myPlayerInfo[0].team === true) {
                dispatch(setPlayerATK(restPlayersInfo[0]));
                dispatch(setPlayerBTK(restPlayersInfo[1]));
                dispatch(setPlayerCTK(restPlayersInfo[2]));
              } else {
                dispatch(setPlayerATK(restPlayersInfo[2]));
                dispatch(setPlayerBTK(restPlayersInfo[0]));
                dispatch(setPlayerCTK(restPlayersInfo[1]));
              }

              if (setPlayerOrder[0].playerId === myId) {
                sendStompMsgFunc(roomId, myId, "PRECHECK", null);
              } else {
                setStatus("WAITING");
              }
              break;
            /* 게임 내내 루프 돌게 되는 함수들 */
            case "PRECHECK":
              if (msgData.gameOver === true) {
                sendStompMsgFunc(roomId, myId, "ENDGAME", null);
              } else if (msgSender === myId && msgData.player.dead === false) {
                dispatch(setThisPlayerTK(msgData.player));
                dispatch(setSelectableCardTK(msgData.cardsDrawed));
              } else if (msgSender !== myId) {
                setUpdateOne(msgData.player);
              }
              setStatus("PRECHECK");
              break;
            case "DRAW":
              if (msgSender === myId) {
                dispatch(setSelectableCardCnt(msgData.selectable));
                setDrawModalOpen(true);
                timerFunc(10000, "SELECT");
                dispatch(setTimerTK("draw"));
                setStatus("DRAW");
              } else {
                setStatus("DRAW");
              }
              break;
            case "ENDDRAW":
              /* CLEAR */
              clearDrawCardsFunc();
              /* NEXT MOVE */
              if (msgSender === myId) {
                dispatch(updateMyCardsTK(msgData.cardsOnHand));
                sendStompMsgFunc(roomId, myId, "TURNCHECK", null);
              } else {
                setStatus("ACTION");
              }
              break;
            case "SELECT":
              /* Clear */
              clearDrawCardsFunc();
              if (msgSender === myId && msgData.isSuccess === true) {
                // setStatus => card draw success!
                dispatch(updateMyCardsTK(msgData.cardsOnHand));
                sendStompMsgFunc(roomId, myId, "TURNCHECK", null);
                // open drawsuccess modal for 3sec
              } else if (msgSender === myId && msgData.isSuccess === false) {
                // setStatus => card draw Failed!
                dispatch(updateMyCardsTK(msgData.cardsOnHand));
                sendStompMsgFunc(roomId, myId, "TURNCHECK", null);
              } else if (msgSender !== myId) {
                setStatus("ACTION");
              }
              break;
            case "TURNCHECK":
              clearDrawCardsFunc();
              if (msgSender === myId && msgData.action === true) {
                dispatch(setTimerTK("action"));
                setStatus("ACTION");
              } else if (msgSender === myId && msgData.action === false) {
                setStatus("ACTIONFAILED");
              } else if (msgSender !== myId && msgData.action === false) {
                setStatus("ACTIONFAILED");
              }
              break;
            case "USECARD":
              if (msgData.gameOver === true) {
                sendStompMsgFunc(roomId, myId, "ENDGAME", null);
                // 만약 현재 플레이어가 나이고 죽은게 아니라면?
              } else {
                // 배열로 내려오는지 확인
                dispatch(setCraveTK(msgData.usedCard));
                setUpdate(msgData.players);
                setStatus("USECARD");
              }
              break;
            case "USEFAIL":
              if (msgSender === myId) {
                // 모달창..
                alert("마나가 부족합니다!");
              }
              break;
            case "DISCARD":
              dispatch(setCraveTK(msgData.discard));
              if (msgSender === myId) {
                dispatch(setThisPlayerTK(msgData));
                setStatus("ACTION");
              } else {
                setUpdateOne(msgData);
                setStatus("DISCARD");
              }
              break;
            case "ENDTURN":
              clearActionTurnFunc();
              setUpdateOne(msgData.player);
              dispatch(setNowPlayerIdTK(msgData.nextPlayerId));
              setStatus("CHANGETURN");
              break;
            case "ENDGAME":
              // 여기서 win/lose Modal
              console.log("게임 끝!");
              alert("게임 끝! 이거는 나중에 만들게요!");
              break;
            default:
              break;
          }
        });
      }
    );
  };

  const roomTitle = useAppSelector((state) => state.game.game.roomTitle);
  console.log(roomTitle);
  useEffect(() => {
    switch (status) {
      case "READY":
        setStartModal(true);
        setTimeout(() => {
          sendStompMsgFunc(roomId, myId, "START", null);
          setStartModal(false);
        }, 3000);
        break;
      case "WAITING":
        console.log("아직 내 턴이 아니옵니다.");
        break;
      case "PRECHECK":
        // 만약 그게 나라면 이제 드로우를 하러 갑니다.
        if (nowPlayerId === playersData.thisPlayer.playerId) {
          sendStompMsgFunc(roomId, myId, "DRAW", null);
        } else {
          // 만약 내가 아니라면 지금 플레이하는 사람의 상태를 최신화할 것이다.
          updatePlayersFunc();
        }
        break;
      case "DRAW":
        break;
      case "ACTION":
        timerFunc(30000, "ENDTURN");
        break;
      case "ACTIONFAILED":
        if (nowPlayerId === playersData.thisPlayer.playerId) {
          // 상태이상으로 인해 턴을 진행할 수 없습니다!
          setTimeout(() => {
            sendStompMsgFunc(roomId, Number(myId), "ENDTURN", null);
          }, 2000);
        }
        break;
      case "USECARD":
        setStatus("USECARDSUCCESS");
        break;
      case "USECARDSUCCESS":
        const thisPlayer = update.filter(
          (value: playersSetting) =>
            Number(value.playerId) === Number(playersData.thisPlayer.playerId)
        );
        if (thisPlayer[0] !== undefined) {
          dispatch(setThisPlayerTK(thisPlayer[0]));
          dispatch(setMyCardsUpdateTK(thisPlayer[0].cardsOnHand));
        }
        const PlayerA = update.filter(
          (value: playersSetting) =>
            value.playerId === playersData.PlayerA.playerId
        );
        const PlayerB = update.filter(
          (value: playersSetting) =>
            value.playerId === playersData.PlayerB.playerId
        );
        const PlayerC = update.filter(
          (value: playersSetting) =>
            value.playerId === playersData.PlayerC.playerId
        );
        if (PlayerA[0] !== undefined) {
          dispatch(setPlayerATK(PlayerA[0]));
          setTargetText(PlayerA[0].username);
        }
        if (PlayerB[0] !== undefined) {
          dispatch(setPlayerBTK(PlayerB[0]));
          setTargetText(PlayerB[0].username);
        }
        if (PlayerC[0] !== undefined) {
          dispatch(setPlayerCTK(PlayerC[0]));
          setTargetText(PlayerC[0].username);
        }

        break;
      case "DISCARD":
        if (nowPlayerId !== playersData.thisPlayer.playerId) {
          updatePlayersFunc();
          setStatus("ACTION");
        }
        break;
      case "CHANGETURN":
        const nowPlayerName = playersList.filter(
          (value: playersSetting) => value.playerId === nowPlayerId
        );
        dispatch(setNowPlayerNameTK(nowPlayerName[0].username));
        updatePlayersFunc();
        if (nowPlayerId === Number(playersData.thisPlayer.playerId)) {
          sendStompMsgFunc(roomId, myId, "PRECHECK", null);
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
    }, 1000);
  }

  const sendStompMsgFunc = (
    roomId: string | undefined,
    sender: number,
    msgType: string,
    data: object | null
  ) => {
    console.log(roomId);
    waitForConnection(stompClient, function () {
      // connect - subscribe - send
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

  /* TIMER */
  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  const timerFunc = (sec: number, turn: string) => {
    timer.current = setTimeout(() => {
      setDrawModalOpen(false);
      sendStompMsgFunc(roomId, myId, turn, null);
      dispatch(setTimerTK(""));
      if (turn === "SELECT") {
        setDrawFailModal(true);
        setTimeout(() => {
          setDrawFailModal(false);
        }, 1000);
      } else if (turn === "ENDTURN") {
        setTimeOutModal(true);
        setTimeout(() => {
          setTimeOutModal(false);
        }, 1000);
      }
    }, sec);
  };

  const ClearTimer = () => {
    window.clearTimeout(timer.current || 0);
  };

  const clearDrawCardsFunc = () => {
    ClearTimer();
    setDrawModalOpen(false);
    dispatch(setTimerTK(""));
    dispatch(clearDrawCardsTK([]));
    dispatch(setSelectableCardCnt(0));
  };

  const clearActionTurnFunc = () => {
    ClearTimer();
    dispatch(setTimerTK(""));
  };

  const updatePlayersFunc = () => {
    switch (updateOne.playerId) {
      case playersData.thisPlayer.playerId:
        dispatch(setThisPlayerTK(updateOne));
        break;
      case playersData.PlayerA.playerId:
        dispatch(setPlayerATK(updateOne));
        break;
      case playersData.PlayerB.playerId:
        dispatch(setPlayerBTK(updateOne));
        break;
      case playersData.PlayerC.playerId:
        dispatch(setPlayerCTK(updateOne));
        break;
    }
  };

  return (
    <>
      {startModal && (
        <AlertPopUp
          upperText="게임 시작!"
          middleText="내 직업을 확인하세요!"
          bottomText=""
        />
      )}
      {drawFailModal && (
        <AlertPopUp
          upperText="시간 초과!"
          middleText="10초가 경과하여"
          bottomText="카드 드로우에 실패했습니다."
        />
      )}
      {timeOutModal && (
        <AlertPopUp
          upperText="시간 초과!"
          middleText="30초가 경과하여"
          bottomText="다음 턴으로 넘어갑니다."
        />
      )}
      {/* {craveCard?.target === "SELECT" && status === "CARDUSESUCCESS" && (
        <AlertPopUp
          upperText={`${nowPlayerName}님이`}
          middleText={`${targetText}님에게`}
          bottomText={`${craveCard.cardName} 카드를 사용했습니다!`}
        />
      )}
      {craveCard?.target === "ALLY" && status === "CARDUSESUCCESS" && (
        <AlertPopUp
          upperText={`${nowPlayerName}님이`}
          middleText={`같은 팀에게`}
          bottomText={`${craveCard.cardName} 카드를 사용했습니다!`}
        />
      )}
      {craveCard?.target === "ENEMY" && status === "CARDUSESUCCESS" && (
        <AlertPopUp
          upperText={`${nowPlayerName}님이`}
          middleText={`상대팀에게`}
          bottomText={`${craveCard.cardName} 카드를 사용했습니다!`}
        />
      )} */}
      <StGameWrap>
        <NoticeField></NoticeField>
        <StGameWrapFilter>
          {status === "" ? (
            <StartModal setStatus={setStatus}></StartModal>
          ) : (
            <>
              <MainWrap>
                <PlayerStatus></PlayerStatus>
                <PlayerIcons status={status}></PlayerIcons>
                <CraveField
                  status={status}
                  sendStompMsgFunc={sendStompMsgFunc}
                ></CraveField>
              </MainWrap>
              <PlayerField
                status={status}
                sendStompMsgFunc={sendStompMsgFunc}
              ></PlayerField>
              {drawModalOpen && (
                <DrawModal sendStompMsgFunc={sendStompMsgFunc}></DrawModal>
              )}{" "}
            </>
          )}
        </StGameWrapFilter>
      </StGameWrap>
    </>
  );
};
export default Ingame;
