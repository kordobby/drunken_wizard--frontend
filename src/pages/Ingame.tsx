/* Package */
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import stompJS from "stompjs";
import { useParams } from "react-router-dom";

/* Hooks */
import { useAppSelector, useAppDispatch } from "../hooks/tsHooks";

/* Modules */
import {
  setNowPlayerIdTK, // use
  setThisPlayerTK, // use
  setTeamPlayerTK, // use
  setEnemyPlayerATK, // use
  setEnemyPlayerBTK, // use
  updateMyCardsTK, // use
  setSelectableCardCnt, // use
  setNowPlayerNameTK, // use
  setTimerTK, // use
  setSelectableCardTK, // use
  setMyCardsUpdateTK, // use
  clearDrawCardsTK, // use
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

/* CSS & SC */
import {
  StGameWrap,
  MainWrap,
} from "../Components/IngameComponents/InGameStyled";
import { playersSetting } from "../typings/typedb";

const Ingame = () => {
  /* useState */
  // #GAME :: Turn Ctrl
  const [status, setStatus] = useState<string>("");

  // #DRAW-TURN :: Modal Ctrl
  const [drawModalOpen, setDrawModalOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<playersSetting[]>([]);

  /* tookit things */
  const dispatch = useAppDispatch();
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);
  const nowPlayerId = useAppSelector((state) => state.game.game.nowPlayerId);

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
        stompClient.subscribe("/sub/game/1", (data: any) => {
          const response = JSON.parse(data.body);
          const msgType = response?.type;
          const msgData = JSON.parse(response?.content);
          const msgSender = response?.sender;
          const playersInfo = msgData.players;
          switch (msgType) {
            case "START":
              const findNowPlayer = playersInfo.filter(
                (value: playersSetting) => value.turnOrder === 1
              );
              dispatch(setNowPlayerIdTK(findNowPlayer[0].playerId));
              dispatch(setNowPlayerNameTK(findNowPlayer[0].username));
              const myPlayerInfo = playersInfo.filter(
                (value: playersSetting) => value.playerId === myId
              );
              dispatch(setThisPlayerTK(myPlayerInfo[0]));
              switch (myPlayerInfo[0].turnOrder) {
                case 1:
                  // 만약 필요하면 여기서 순서 저장하면 됨!
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 3
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 2
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 4
                      )[0]
                    )
                  );
                  break;
                case 2:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 4
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 1
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 3
                      )[0]
                    )
                  );
                  break;
                case 3:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 1
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 2
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 4
                      )[0]
                    )
                  );
                  break;
                case 4:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 2
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 1
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: playersSetting) => value.turnOrder === 3
                      )[0]
                    )
                  );
                  break;
                default:
                  break;
              }
              if (findNowPlayer[0].playerId === myId) {
                sendStompMsgFunc("1", myId, "PRECHECK", null);
              } else {
                setStatus("WAITING");
              }
              break;
            case "PRECHECK":
              if (msgData.gameOver === true) {
                sendStompMsgFunc("1", myId, "ENDGAME", null);
              } else if (
                msgSender === myId &&
                msgData.player[0].dead === false
              ) {
                dispatch(setThisPlayerTK(msgData.player[0]));
                dispatch(setSelectableCardTK(msgData.cardsDrawed));
                sendStompMsgFunc("1", myId, "DRAW", null);
              } else if (msgSender !== myId) {
                setStatus("WAITING");
              }
              break;
            case "DRAW":
              if (msgSender === myId) {
                dispatch(setSelectableCardCnt(msgData.selectable));
                setDrawModalOpen(true);
                timerFunc(10000, "SELECT");
                dispatch(setTimerTK("draw"));
              }
              break;
            case "ENDDRAW":
              /* CLEAR */
              clearDrawCardsFuc();
              /* NEXT MOVE */
              if (msgSender === myId) {
                dispatch(updateMyCardsTK(msgData.cardsOnHand));
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              }
              break;
            case "SELECT":
              /* Clear */
              clearDrawCardsFuc();
              if (msgSender === myId && msgData.isSuccess === true) {
                // setStatus => card draw success!
                dispatch(updateMyCardsTK(msgData.cardsOnHand));
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              } else if (msgSender === myId && msgData.isSuccess === false) {
                // setStatus => card draw Failed!
                dispatch(updateMyCardsTK(msgData.cardsOnHand));
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              }
              break;
            case "TURNCHECK":
              clearDrawCardsFuc();
              if (msgSender === myId && msgData.action === true) {
                dispatch(setTimerTK("action"));
                timerFunc(30000, "ENDTURN");
              } else if (msgSender === myId && msgData.action === false) {
                sendStompMsgFunc("1", Number(myId), "ENDTURN", null);
              }
              break;
            case "USECARD":
              if (msgSender === myId && msgData === "마나부족") {
                alert("마나가 부족합니다!");
              } else {
                setUpdate(msgData.player);
                setStatus("USECARD");
              }
              break;
            case "DISCARD":
              if (msgSender === myId) {
                dispatch(setMyCardsUpdateTK(msgData.player[0].cardsOnHand));
              }
              break;
            case "ENDTURN":
              clearActionTurnFunc();
              setUpdate(msgData.player);
              dispatch(setNowPlayerIdTK(msgData.nextPlayerId));
              setStatus("CHANGETURN");
              break;
            case "ENDGAME":
              // 여기서 win/lose Modal
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
      case "USECARD":
        const thisPlayer = update.filter(
          (value: playersSetting) =>
            Number(value.playerId) === Number(playersData.thisPlayer.playerId)
        );
        if (thisPlayer[0] !== undefined) {
          dispatch(setThisPlayerTK(thisPlayer[0]));
          dispatch(setMyCardsUpdateTK(thisPlayer[0].cardsOnHand));
        }
        const teamPlayer = update.filter(
          (value: playersSetting) =>
            value.playerId === playersData.teamPlayer.playerId
        );
        const enemyA = update.filter(
          (value: playersSetting) =>
            value.playerId === playersData.enemyPlayerA.playerId
        );
        const enemyB = update.filter(
          (value: playersSetting) =>
            value.playerId === playersData.enemyPlayerB.playerId
        );
        if (teamPlayer[0] !== undefined) {
          dispatch(setTeamPlayerTK(teamPlayer[0]));
        }
        if (enemyA[0] !== undefined) {
          dispatch(setEnemyPlayerATK(enemyA[0]));
        }
        if (enemyB[0] !== undefined) {
          dispatch(setEnemyPlayerBTK(enemyB[0]));
        }
        break;
      case "CHANGETURN":
        const nowPlayerName = playersList.filter(
          (value: playersSetting) => value.playerId === nowPlayerId
        );
        dispatch(setNowPlayerNameTK(nowPlayerName[0].username));

        switch (update[0].playerId) {
          case playersData.thisPlayer.playerId:
            dispatch(setThisPlayerTK(update[0]));
            break;
          case playersData.teamPlayer.playerId:
            dispatch(setTeamPlayerTK(update[0]));
            break;
          case playersData.enemyPlayerA.playerId:
            dispatch(setEnemyPlayerATK(update[0]));
            break;
          case playersData.enemyPlayerB.playerId:
            dispatch(setEnemyPlayerBTK(update[0]));
            break;
          default:
            break;
        }

        if (nowPlayerId === Number(playersData.thisPlayer.playerId)) {
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

  /* TIMER */
  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  const timerFunc = (sec: number, turn: string) => {
    timer.current = setTimeout(() => {
      setDrawModalOpen(false);
      sendStompMsgFunc("1", myId, turn, null);
      dispatch(setTimerTK(""));
      alert("시간초과!");
    }, sec);
  };

  const ClearTimer = () => {
    window.clearTimeout(timer.current || 0);
  };

  const clearDrawCardsFuc = () => {
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

  return (
    <>
      {/* {status === "" && <StartModal setStatus={setStatus}></StartModal>} */}
      <StGameWrap>
        <NoticeField status={status}></NoticeField>
        <MainWrap>
          <PlayerIcons></PlayerIcons>
          <CraveField></CraveField>
        </MainWrap>
        <PlayerField sendStompMsgFunc={sendStompMsgFunc}></PlayerField>
        {drawModalOpen && (
          <DrawModal sendStompMsgFunc={sendStompMsgFunc}></DrawModal>
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
