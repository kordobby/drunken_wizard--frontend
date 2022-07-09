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
