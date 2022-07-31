/* Package */
import { useState, useEffect } from "react";

/* Modules */
import { StartModalProps } from "../../../typings/typedb";
/* Components */
import Loading from "../../../pages/Loading";
import { useAppSelector } from "../../../hooks/tsHooks";
import { setCookie, getCookie } from "../../../Shared/Cookies";
const StartModal = ({ setStatus }: StartModalProps) => {
  // const roomId = useAppSelector((state) => state.game.game.roomTitle);
  // const reconnectState = useAppSelector((state) => state.game.game.timer);
  // const checkGame = getCookie("roomId");

  useEffect(() => {
    setTimeout(() => {
      setStatus("READY");
      // setCookie("roomId", roomId, {
      //   path: "/",
      //   expire: "after60m",
      // });
    }, 6000);
  }, []);

  // useEffect(() => {
  //   if (checkGame === undefined) {
  //     setTimeout(() => {
  //       setStatus("READY");
  //       setCookie("roomId", roomId, {
  //         path: "/",
  //         expire: "after60m",
  //       });
  //       alert("시작합니다");
  //     }, 6000);
  //     return;
  //   }
  //   if (checkGame === roomId && reconnectState === "action") {
  //     setStatus("TURNCHECK");
  //     return;
  //   }
  //   if (checkGame === roomId && reconnectState === "draw") {
  //     setStatus("PRECHECK");
  //   }
  //   if (checkGame === roomId && reconnectState === "") {
  //     setStatus("WAITING");
  //     console.log("아무일도없었다.");
  //   }
  // }, []);

  return (
    <>
      <Loading></Loading>
    </>
  );
};

export default StartModal;
