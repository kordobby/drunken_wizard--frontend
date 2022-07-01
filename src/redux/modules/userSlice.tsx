import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __checkUserId = createAsyncThunk(
  "user/CHECKID",
  async (payload: string) => {
    const response = await axios.post(
      `http://3.35.214.100/user/dubcheck`,
      payload
    );
    // 중복확인 결과에 따라 alert 후 상태 저장
    if (!response.data.result) alert("동일한 아이디가 존재합니다");
    return response.data.result;
  }
);

interface CounterState {
  CheckedId: string;
  loading: boolean;
  error: null | string;
  success: boolean;
}

const initialState: CounterState = {
  CheckedId: "",
  loading: false,
  error: null,
  success: false,
};
/* Reducer */
export const userSlice = createSlice({
  name: "user",
  initialState: {
    CheckedId: "",
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // changeCheckId: (state, payload) => {
    //   state.checkName = false;
    // },
  },
  extraReducers: (builder: any) => {
    builder.addCase(__checkUserId.fulfilled, (state: any, action: any) => {
      state.CheckedId = action.payload;
    });
  },
});

// export const { changeCheckId } = userSlice.actions;
export default userSlice.reducer;
