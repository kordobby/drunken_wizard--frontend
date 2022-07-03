export interface IUser {
  username: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  // Workspaces: IWorkspace[];
}
export interface LogUser {
  username: string;
  password: string;
  // Workspaces: IWorkspace[];
}
