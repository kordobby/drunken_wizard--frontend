import { QueryFunctionContext } from "react-query";
import {
  IUser,
  LogUser,
  AddRoomType,
  WaitingRoom,
  RoomPage,
  PageNum,
} from "../../typings/db";
import api from "./core/api";

const code = new URL(window.location.href).searchParams.get("code");

const apis = {
  // example
  signUpMT: async (data: IUser) => await api.post("/user/signup", data),
  signUpIdCheckMT: async (data: object) =>
    await api.post("/user/dubcheck", data),
  loginMT: async (data: LogUser) => await api.post("/login", data),
  kakaoQR: async () => await api.get(`/user/kakao/callback?code=${code}`),
  getRoomListQR: async (page: number) => {
    const response = await api.get(`/game/rooms?page=${page}&size=6`);
    return response.data;
  },
  createRoomMT: async (data: AddRoomType) => await api.post("/game/room", data),
  joinRoomMT: async (data: WaitingRoom) =>
    await api.post(`/game/${data.roomId}/join`, data),
  leaveRoomMT: async (data: WaitingRoom) =>
    await api.post(`/game/${data.roomId}/leave`, data),
};

export default apis;
