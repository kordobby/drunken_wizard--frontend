/* Package */
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import stompJS from "stompjs";
import { useParams } from "react-router-dom";

/* Hooks */
import { useAppSelector, useAppDispatch } from "../hooks/tsHooks";

/* Modules */
import {
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
import OneBtnModal from "../elem/OneBtnModal";
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

  /* tookit things */
  const dispatch = useAppDispatch();
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);
  const nowPlayerId = useAppSelector((state) => state.game.game.nowPlayerId);
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

              restPlayersInfo.sort((a: playersSetting, b: playersSetting) => {
                if (
                  (myPlayerInfo[0].team === a.team > myPlayerInfo[0].team) ===
                  b.team
                )
                  return -1;
              });

              dispatch(setPlayerATK(restPlayersInfo[0]));
              dispatch(setPlayerBTK(restPlayersInfo[1]));
              dispatch(setPlayerCTK(restPlayersInfo[2]));

              if (setPlayerOrder[0].playerId === myId) {
                sendStompMsgFunc(roomId, myId, "PRECHECK", null);
              } else {
                setStatus("WAITING");
              }
              break;
            case "PRECHECK":
              // 게임이 만약 끝났다면, ENDGAME 처리
              if (msgData.gameOver === true) {
                sendStompMsgFunc(roomId, myId, "ENDGAME", null);
                // 만약 현재 플레이어가 나이고 죽은게 아니라면?
              } else if (msgSender === myId && msgData.player.dead === false) {
                dispatch(setThisPlayerTK(msgData.player));
                dispatch(setSelectableCardTK(msgData.cardsDrawed));
                // 내가 지금 플레이를 하는게 아니라면, 해당 유저의 데이터를 바꾸러 갈 것이다.
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
                timerFunc(30000, "ENDTURN");
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
                alert("마나가 부족하거나 니가 침묵에 걸렸겠지!");
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
        break;
      case "ACTIONFAILED":
        if (nowPlayerId === playersData.thisPlayer.playerId) {
          setTimeout(() => {
            sendStompMsgFunc(roomId, Number(myId), "ENDTURN", null);
          }, 3000);
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
        }
        if (PlayerB[0] !== undefined) {
          dispatch(setPlayerBTK(PlayerB[0]));
        }
        if (PlayerC[0] !== undefined) {
          dispatch(setPlayerCTK(PlayerC[0]));
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
          setTimeout(function () {
            sendStompMsgFunc(roomId, myId, "PRECHECK", null);
          }, 3000);
        } else {
          setTimeout(function () {
            setStatus("WAITING");
          }, 1000);
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
        }, 2000);
      } else if (turn === "ENDTURN") {
        setTimeOutModal(true);
        setTimeout(() => {
          setTimeOutModal(false);
        }, 2000);
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
      {status === "CARDUSESUCCESS" && (
        <AlertPopUp
          upperText="nowPlayer님이"
          middleText="targetUserName 님에게"
          bottomText="useCard 카드를 사용했습니다!"
        />
      )}
      <NoticeField></NoticeField>
      <StGameWrap>
        <StGameWrapFilter>
          {status !== "" ? (
            <StartModal setStatus={setStatus}></StartModal>
          ) : (
            <>
              <MainWrap>
                <PlayerStatus></PlayerStatus>
                <PlayerIcons status={status}></PlayerIcons>
                <CraveField sendStompMsgFunc={sendStompMsgFunc}></CraveField>
              </MainWrap>
              <PlayerField sendStompMsgFunc={sendStompMsgFunc}></PlayerField>
              {drawModalOpen && (
                <DrawModal sendStompMsgFunc={sendStompMsgFunc}></DrawModal>
              )}
            </>
          )}
        </StGameWrapFilter>
      </StGameWrap>
      <button
        onClick={() => {
          sendStompMsgFunc(roomId, myId, "ENDGAME", null);
        }}
      >
        게임 종료
      </button>
    </>
  );
};
export default Ingame;
