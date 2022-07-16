import { getCookie } from "./Cookies";
import stompJS from "stompjs";
import sockJS from "sockjs-client";

const API_URL = process.env.REACT_APP_API_URL;
// 소켓 연결
export const socket = new sockJS(`${API_URL}SufficientAmountOfAlcohol`); //   /ws-stomp
const stompClient = stompJS.over(socket);
const accessToken = getCookie("token");
const accessId = getCookie("id");

// export const socket = new sockJS(
//   "http://3.35.53.184/SufficientAmountOfAlcohol"

export const trySocketConnect = () => {
  stompClient.connect(
    {
      token: accessToken,
      id: accessId,
    },
    () => {
      console.log("connect success");
    }
  );
};

export const socketDisconnect = () => {
  stompClient.disconnect(
    () => {
      console.log("disconnect");
    },
    { token: accessToken }
  );
};

// 소켓 구독

const socketUnsubscribe = () => {
  try {
    stompClient
      .subscribe(`/sub/public`, function (data: any) {}, {})
      .unsubscribe();
    console.log("success to unsubscribe");
    //   setSubscribeState(false);
  } catch (error) {
    console.log(error);
  }
};

// 입장 메세지
