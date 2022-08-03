/* Package */
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import stompJS from "stompjs";
import { useNavigate, useParams } from "react-router-dom";

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
import { getCookie } from "../Shared/Cookies";

/* Components */
import PlayerField from "../Components/ingameComponents/PlayerField/PlayerField";
import DrawModal from "../Components/ingameComponents/Modals/DrawModal";
import NoticeField from "../Components/ingameComponents/NoticeField/NoticeField";
import StartModal from "../Components/ingameComponents/Modals/StartModal";
import PlayerIcons from "../Components/ingameComponents/MainField/PlayerIcons";
import CraveField from "../Components/ingameComponents/MainField/CraveField";
import PlayerStatus from "../Components/ingameComponents/MainField/PlayerStatus";
import TwoBtnModal from "../elem/TwoBtnModal";
import OverModal from "../Components/ingameComponents/Modals/OverModal";

/* CSS & SC */
import {
  StGameWrap,
  MainWrap,
  StGameWrapFilter,
} from "../Components/ingameComponents/InGameStyled/InGameStyled";
import { playersSetting } from "../typings/typedb";
import AlertPopUp from "../Components/ingameComponents/InGameCommon/AlertPopUp";
import useSound from "use-sound";
import turn from "../sounds/turn.mp3";

const Ingame = () => {
  /* useState */
  // #GAME :: Turn Ctrl
  const [turnChange] = useSound(turn);
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
  const [allyModal, setAllyModal] = useState<boolean>(false);
  const [enemyModal, setEnemyModal] = useState<boolean>(false);
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const [meModal, setMeModal] = useState<boolean>(false);
  const [manaModal, setManaModal] = useState<boolean>(false);
  const [useFailModal, setUseFailModal] = useState<boolean>(false);
  const [connectModal, setConnectModal] = useState<boolean>(false);
  const [overTeam, setOverTeam] = useState<boolean>(false);
  /* targetText */
  const [targetText, setTargetText] = useState<string>("");

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
  stompClient.debug = (f) => f;
  const accessToken = getCookie("token");
  const { roomId } = useParams();
  const myId = Number(getCookie("id"));

  const [reloadModal, setReloadModal] = useState<boolean>(false);
  const doNotReload = (event: any) => {
    if (
      (event.ctrlKey === true &&
        (event.keyCode === 78 || event.keyCode === 82)) ||
      event.keyCode === 116
    ) {
      setReloadModal(true);
      setTimeout(() => {
        setReloadModal(false);
      }, 1000);
    }
  };

  useEffect(() => {
    document.onkeydown = doNotReload;
  });

  useEffect(() => {
    waitForConnection(stompClient, socketSubscribe());
    return () => {
      socketUnsubscribe();
    };
  }, []);

  const socketUnsubscribe = () => {
    try {
      stompClient.unsubscribe("sub-0");
    } catch (error) {
      // console.log(error);
    }
  };

  const socketSubscribe = () => {
    try {
      stompClient.connect(
        {
          token: accessToken,
        },
        () => {
          stompClient.subscribe(`/sub/game/${roomId}`, (data: any) => {
            // console.log(data);
            // console.log(stompClient.ws.readyState);
            const response = JSON.parse(data.body);
            const msgData = JSON.parse(response?.content);
            const msgSender = response?.sender;
            const playersInfo = msgData.players;
            switch (response?.type) {
              case "START":
                stompClient.unsubscribe(`/sub/wroom/${roomId}`);
                setStartModal(true);
                setTimeout(() => {
                  setStartModal(false);
                }, 1000);
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
                  // setTimeout(() => {
                  //   sendStompMsgFunc(roomId, myId, "PRECHECK", null);
                  // }, 2000);
                  sendStompMsgFunc(roomId, myId, "PRECHECK", null);
                } else {
                  setStatus("WAITING");
                }
                break;
              /* 게임 내내 루프 돌게 되는 함수들 */
              case "PRECHECK":
                if (msgData.gameOver === true) {
                  sendStompMsgFunc(roomId, myId, "ENDGAME", null);
                } else if (
                  msgSender === myId &&
                  msgData.player.dead === false
                ) {
                  dispatch(setThisPlayerTK(msgData.player));
                  dispatch(setSelectableCardTK(msgData.cardsDrawed));
                } else if (msgSender !== myId) {
                  setUpdateOne(msgData.player);
                }
                setStatus("PRECHECK");
                break;
              case "DRAW":
                if (msgSender === myId) {
                  // turnChange();
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
                  setStatus("WAITING");
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
                  setStatus("WAITING");
                }
                break;
              case "TURNCHECK":
                turnChange();
                clearDrawCardsFunc();
                if (msgSender === myId && msgData.action === true) {
                  dispatch(setTimerTK("action"));
                  setStatus("ACTION");
                } else if (msgSender === myId && msgData.action === false) {
                  //   setUseFailModal, setManaModal
                  setUseFailModal(true);
                  setTimeout(() => {
                    setStatus("ACTIONFAILED");
                    setUseFailModal(false);
                  }, 1000);
                } else if (msgSender !== myId && msgData.action === false) {
                  setStatus("ACTIONFAILED");
                  setUseFailModal(true);
                  setTimeout(() => {
                    setStatus("ACTIONFAILED");
                    setUseFailModal(false);
                  }, 1000);
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
                  setManaModal(true);
                  setTimeout(() => {
                    setManaModal(false);
                  }, 1000);
                }
                break;
              case "DISCARD":
                dispatch(setCraveTK(msgData.discard));
                if (msgSender === myId) {
                  dispatch(setThisPlayerTK(msgData));
                  setStatus("WAITING");
                } else {
                  setUpdateOne(msgData);
                  setStatus("DISCARD");
                }
                break;
              case "ENDTURN":
                turnChange();
                clearActionTurnFunc();
                setUpdateOne(msgData.player);
                dispatch(setNowPlayerIdTK(msgData.nextPlayerId));
                setStatus("CHANGETURN");
                break;
              case "ENDGAME":
                // 여기서 win/lose Modal
                setOverTeam(msgData.winningTeam);
                setStatus("ENDGAME");
                break;
              default:
                break;
            }
          });
        }
      );
    } catch (error) {
      // console.log(error);
      setConnectModal(true);
    }
  };

  useEffect(() => {
    switch (status) {
      case "READY":
        setTimeout(() => {
          sendStompMsgFunc(roomId, myId, "START", null);
        }, 2000);
        break;
      case "WAITING":
        // console.log("아직 내 턴이 아니옵니다.");
        break;
      case "PRECHECK":
        // 만약 그게 나라면 이제 드로우를 하러 갑니다.
        if (nowPlayerId === myId) {
          sendStompMsgFunc(roomId, myId, "DRAW", null);
        } else {
          // 만약 내가 아니라면 지금 플레이하는 사람의 상태를 최신화할 것이다.
          updatePlayersFunc();
          setStatus("WAITING");
        }
        break;
      case "DRAW":
        break;
      case "ACTION":
        if (nowPlayerId === playersData.thisPlayer.playerId) {
          timerFunc(30000, "ENDTURN");
        }
        break;
      case "ACTIONFAILED":
        if (nowPlayerId === playersData.thisPlayer.playerId) {
          // 상태이상으로 인해 턴을 진행할 수 없습니다!
          setTimeout(() => {
            sendStompMsgFunc(roomId, Number(myId), "ENDTURN", null);
          }, 500);
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
        switch (craveCard.target) {
          case "SELECT":
            const targetPlayer = update.filter(
              (value: playersSetting) =>
                Number(value.playerId) !== Number(nowPlayerId)
            );
            if (targetPlayer[0] === undefined) {
              setTargetText(update[0].username);
            }
            switch (targetPlayer[0]?.playerId) {
              case playersData.PlayerA.playerId:
                setTargetText(targetPlayer[0].username);
                break;
              case playersData.PlayerB.playerId:
                setTargetText(targetPlayer[0].username);
                break;
              case playersData.PlayerC.playerId:
                setTargetText(targetPlayer[0].username);
                break;
              case playersData.thisPlayer.playerId:
                setTargetText(targetPlayer[0].username);
                break;
              default:
                break;
            }
            setSelectModal(true);
            setTimeout(() => {
              setSelectModal(false);
            }, 1000);
            break;
          case "ALLY":
            setAllyModal(true);
            setTimeout(() => {
              setAllyModal(false);
            }, 1000);
            break;
          case "ENEMY":
            setEnemyModal(true);
            setTimeout(() => {
              setEnemyModal(false);
            }, 1000);
            break;
          case "ME":
            setMeModal(true);
            setTimeout(() => {
              setMeModal(false);
            }, 1000);
            break;
          default:
            break;
        }
        setStatus("WAITING");
        break;
      case "DISCARD":
        if (nowPlayerId !== playersData.thisPlayer.playerId) {
          updatePlayersFunc();
          setStatus("WAITING");
        }
        break;
      case "CHANGETURN":
        ClearTimer();
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
      case "ENDGAME":
        if (overTeam === playersData.thisPlayer.team) {
          setStatus("WIN");
        } else {
          setStatus("LOSE");
        }
        break;
      default:
        break;
    }
  }, [status]);

  // send stompMsg
  const waitForConnection = (stompClient: stompJS.Client, callback: any) => {
    setTimeout(function () {
      if (stompClient.ws.readyState === 1) {
        console.log("Connection is made");
        if (callback != null) {
          callback();
        }
      } else {
        console.log("wait for connection...");
        waitForConnection(stompClient, callback);
      }
    }, 250);
  };

  const sendStompMsgFunc = (
    roomId: string | undefined,
    sender: number,
    msgType: string,
    data: object | null
  ) => {
    waitForConnection(stompClient, function () {
      // connect - subscribe - send
      try {
        stompClient.send(
          `/pub/game/${roomId}`,
          { token: accessToken },
          JSON.stringify({
            roomId: roomId,
            sender: sender,
            content: JSON.stringify(data),
            type: msgType,
          })
        );
      } catch (error) {
        // console.log(error);
        setConnectModal(true);
      }
    });
  };

  /* TIMER */
  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  const timerFunc = (sec: number, turn: string) => {
    timer.current = setTimeout(() => {
      ClearTimer();
      setDrawModalOpen(false);
      if (nowPlayerId === myId) {
        sendStompMsgFunc(roomId, myId, turn, null);
      }
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

  const navigate = useNavigate();
  const leaveRoomFunc = () => {
    // setConnectModal(false);
    socketUnsubscribe();
    navigate("/lobby");
  };

  const [roomOutModal, setRoomOutModal] = useState<boolean>(false);
  return (
    <>
      {/* <PlayBtn></PlayBtn> */}
      {startModal && (
        <AlertPopUp
          upperText="게임 시작!"
          middleText="내 직업을 확인하세요!"
          bottomText=""
        />
      )}
      {manaModal && (
        <AlertPopUp
          upperText="카드 사용 실패!"
          middleText="혹시.."
          bottomText="마나가 부족한 것은 아닐까요?"
        />
      )}
      {useFailModal && (
        <AlertPopUp
          upperText="상태이상! ㅠㅠ "
          middleText="상태이상으로 인해"
          bottomText="액션턴이 지나갑니다."
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
      {selectModal && (
        <AlertPopUp
          upperText={`${nowPlayerName}님이`}
          middleText={`${targetText}님에게`}
          bottomText={`${craveCard.cardName} 카드를 사용했습니다!`}
        />
      )}
      {allyModal && (
        <AlertPopUp
          upperText={`${nowPlayerName}님이`}
          middleText={`같은 팀에게`}
          bottomText={`${craveCard.cardName} 카드를 사용했습니다!`}
        />
      )}
      {enemyModal && (
        <AlertPopUp
          upperText={`${nowPlayerName}님이`}
          middleText={`상대팀에게`}
          bottomText={`${craveCard.cardName} 카드를 사용했습니다!`}
        />
      )}
      {meModal && (
        <AlertPopUp
          upperText={`${nowPlayerName}님이`}
          middleText={`자기 자신에게`}
          bottomText={`${craveCard.cardName} 카드를 사용했습니다!`}
        />
      )}
      {status === "WIN" && (
        <OverModal status={status} clickFunc={leaveRoomFunc}></OverModal>
      )}
      {status === "LOSE" && (
        <OverModal status={status} clickFunc={leaveRoomFunc}></OverModal>
      )}

      {roomOutModal && (
        <TwoBtnModal
          confirmText={"확인"}
          cancelText={"취소"}
          titleText={"정말 방에서 나가시겠습니까?"}
          upperText={"로비 화면으로 돌아갑니다."}
          lowerText={"게임 도중 퇴장 시에는 패배로 기록됩니다."}
          confirmFunc={leaveRoomFunc}
          cancelFunc={() => setRoomOutModal(false)}
        />
      )}

      {reloadModal && (
        <AlertPopUp
          upperText={`새로고침을 하면`}
          middleText={`게임이 정상작동하지 않을 수 있어요!`}
          bottomText=""
        />
      )}
      {status === "" ? (
        <StartModal setStatus={setStatus}></StartModal>
      ) : (
        <>
          <NoticeField setRoomOutModal={setRoomOutModal}></NoticeField>
          <StGameWrap>
            <StGameWrapFilter>
              <MainWrap>
                <PlayerStatus></PlayerStatus>
                <PlayerIcons status={status}></PlayerIcons>
                <CraveField
                  sendStompMsgFunc={sendStompMsgFunc}
                  ClearTimer={ClearTimer}
                ></CraveField>
              </MainWrap>
              <PlayerField
                status={status}
                sendStompMsgFunc={sendStompMsgFunc}
              ></PlayerField>
              {drawModalOpen && (
                <DrawModal
                  sendStompMsgFunc={sendStompMsgFunc}
                  ClearTimer={ClearTimer}
                ></DrawModal>
              )}
            </StGameWrapFilter>
          </StGameWrap>
        </>
      )}
    </>
  );
};
export default Ingame;
