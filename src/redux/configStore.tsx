import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import user from "./modules/userSlice";
import game from "./modules/ingameSlice";
const middlewares = [thunk];

// 스토어 연결
export const store = configureStore({
  reducer: {
    user: user,
    game,
  },
  // 미들웨어가 thunk 뿐이라 생략 가능하지만 추후 logger 사용 가능성이 있어 표시
  middleware: [...middlewares],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
