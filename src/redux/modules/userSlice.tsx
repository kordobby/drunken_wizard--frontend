import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../configStore";

// export const __checkUserId = createAsyncThunk(
//   "user/CHECKID",
//   async (payload: object) => {
//     const response = await axios.post(
//       `http://3.35.214.100/user/dubcheck`,
//       payload
//     );
//     // 중복확인 결과에 따라 alert 후 상태 저장
//     if (!response.data.result) alert("동일한 아이디가 존재합니다");
//     return response.data.result;
//   }
// );

interface userState {
  CheckedId: boolean;
  loading: boolean;
  error: null | string;
  success: boolean;
}

const initialState: userState = {
  CheckedId: false,
  loading: false,
  error: null,
  success: false,
};
/* Reducer */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // changeCheckId: (state, payload) => {
    //   state.checkdId = false;
    // },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(__checkUserId.fulfilled, (state, action) => {
  //     state.CheckedId = action.payload;
  //   });
  // },
});

// export const { __changeCheckId } = userSlice.actions;
export default userSlice.reducer;
