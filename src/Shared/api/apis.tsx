import { useEffect } from "react";
import { IUser, LogUser } from "../../typings/db";
import { getCookie } from "../Cookies";
import api from "./core/api";

export const accessToken = getCookie("token");

const apis = {
  // example
  signUpMT: (data: IUser) => api.post("/user/signup", data),
  signUpIdCheckMT: (data: object) => api.post("/user/dubcheck", data),
  loginMT: (data: LogUser) => api.post("/login", data),
  getRoomListQR: () => api.get("/game/rooms"),
  createRoomMT: (data: any) =>
    api.post("/game/room", data, {
      headers: {
        Authorization: accessToken,
      },
    }),
  waitngRoomMT: (data: object) =>
    api.post("/game/room", data, {
      headers: {
        Authorization: accessToken,
      },
    }),
  leaveRoomMT: (data: object) =>
    api.post("/game/room", data, {
      headers: {
        Authorization: accessToken,
      },
    }),
};

export default apis;
