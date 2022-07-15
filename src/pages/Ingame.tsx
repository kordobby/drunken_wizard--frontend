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
import { playersSetting, Card } from "../typings/typedb";

const Ingame = () => {
  /* useState */
  // #GAME :: Turn Ctrl
  const [status, setStatus] = useState<string>("");

  // #DRAW-TURN :: Modal Ctrl
  const [drawModalOpen, setDrawModalOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<playersSetting[]>([]);
  const [updateOne, setUpdateOne] = useState<{
    cardsOnHand: Card[];
    charactorClass: string;
    playerId: number;
    health: number;
    username: string;
    dead: boolean;
    mana: number;
    manaCostModifierDuration: number;
    mutedDuration: number;
    petrifiedDuration: number;
    poisonedDuration: number;
    shield: boolean;
    sleepDuration: number;
    stunnedDuration: number;
    team: boolean;
    turnOrder: number;
    weakDuration: number;
    damageModifierDuration: number;
  }>({
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
          console.log(response);
          console.log(msgData);
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
                  // 나 => enemyA => 팀 => enemyB
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
              clearDrawCardsFuc();
              /* NEXT MOVE */
              if (msgSender === myId) {
                dispatch(updateMyCardsTK(msgData.cardsOnHand));
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              } else {
                setStatus("ACTION");
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
              } else if (msgSender !== myId) {
                setStatus("ACTION");
              }
              break;
            case "TURNCHECK":
              clearDrawCardsFuc();
              if (msgSender === myId && msgData.action === true) {
                dispatch(setTimerTK("action"));
                timerFunc(30000, "ENDTURN");
                setStatus("ACTION");
              } else if (msgSender === myId && msgData.action === false) {
                sendStompMsgFunc("1", Number(myId), "ENDTURN", null);
              }
              break;
            case "USECARD":
              setUpdate(msgData.players);
              setStatus("USECARD");
              break;
            case "USEFAIL":
              if (msgSender === myId) {
                alert("마나가 부족합니다!");
              }
              break;
            case "DISCARD":
              if (msgSender === myId) {
                console.log("카드 바꿉니다");
                dispatch(updateMyCardsTK(msgData.cardsOnHand));
                // dispatch(setThisPlayerTK(msgData));
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
        setTimeout(() => {
          sendStompMsgFunc("1", myId, "START", null);
        }, 3000);
        break;
      case "WAITING":
        console.log("아직 내 턴이 아니옵니다.");
        break;
      case "PRECHECK":
        if (nowPlayerId === playersData.thisPlayer.playerId) {
          sendStompMsgFunc("1", myId, "DRAW", null);
        } else {
          switch (updateOne.playerId) {
            case playersData.teamPlayer.playerId:
              dispatch(setTeamPlayerTK(updateOne));
              break;
            case playersData.enemyPlayerA.playerId:
              dispatch(setEnemyPlayerATK(updateOne));
              break;
            case playersData.enemyPlayerB.playerId:
              dispatch(setEnemyPlayerBTK(updateOne));
              break;
            default:
              break;
          }
        }
        console.log("휴");
        break;
      case "DRAW":
        break;
      case "ACTION":
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

        switch (updateOne.playerId) {
          case playersData.thisPlayer.playerId:
            dispatch(setThisPlayerTK(updateOne));
            break;
          case playersData.teamPlayer.playerId:
            dispatch(setTeamPlayerTK(updateOne));
            break;
          case playersData.enemyPlayerA.playerId:
            dispatch(setEnemyPlayerATK(updateOne));
            break;
          case playersData.enemyPlayerB.playerId:
            dispatch(setEnemyPlayerBTK(updateOne));
            break;
          default:
            break;
        }

        if (nowPlayerId === Number(playersData.thisPlayer.playerId)) {
          setTimeout(function () {
            if (stompClient.ws.readyState === 1) {
              sendStompMsgFunc("1", myId, "PRECHECK", null);
            }
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
      {status === "" && <StartModal setStatus={setStatus}></StartModal>}
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
