import { IUser, LogUser, AddRoomType, waitingRoom } from "../../typings/db";
import api from "./core/api";

const code = new URL(window.location.href).searchParams.get("code");

const apis = {
  // example
  signUpMT: (data: IUser) => api.post("/user/signup", data),
  signUpIdCheckMT: (data: object) => api.post("/user/dubcheck", data),
  loginMT: (data: LogUser) => api.post("/login", data),
  kakaoQR: () => api.get(`/user/kakao/callback?code=${code}`),
  getRoomListQR: () => api.get("/game/rooms"),
  createRoomMT: (data: AddRoomType) => api.post("/game/room", data),
  joinRoomMT: (data: waitingRoom) =>
    api.post(`/game/${data.roomId}/join`, data),
  leaveRoomMT: (data: waitingRoom) =>
    api.post(`/game/${data.roomId}/leave`, data),
};

export default apis;
