import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      // localStorage.setItem("uid",);
      state.isLogin = true;
    },
    logoutUser: (state, action) => {
      localStorage.clear();
      return initialState; // initialState로 리턴 수정
    },
  },
});

export const { login, logout, updateNickname } = authSlice.actions;
export default authSlice.reducer;
