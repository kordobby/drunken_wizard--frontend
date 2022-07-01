import { combineReducers, configureStore } from "@reduxjs/tookit;
import thunk from "redux-thunk";
import user from "./modules/userSlice";
const middlewares = [thunk];
// 리듀서 통합
const rootReducer = combineReducers({
  user: user,
});
// 스토어 연결
const store = configureStore({
  reducer: rootReducer,
  // 미들웨어가 thunk 뿐이라 생략 가능하지만 추후 logger 사용 가능성이 있어 표시
  middleware: [...middlewares],
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store;
