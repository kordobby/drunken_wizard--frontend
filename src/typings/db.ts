import { Dispatch, SetStateAction } from "react";

// signUp
export interface IUser {
  username: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
}

// login
export interface LogUser {
  username: string;
  password: string;
}
export interface loginStateProps {
  setLoginState: Dispatch<SetStateAction<boolean>>;
}

// modal
export interface ModalType {
  modalClose: () => void;
}

// chatList
export interface ChatType {
  type: string;
  message: string;
  sender: string;
}

// createroom
export interface AddRoomType {
  roomName: string;
}

export interface joinRoomType {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// joinroom
export interface waitingRoom {
  roomId: string | undefined;
  id: string;
}
