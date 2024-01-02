import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isLogin: boolean;
};

const initialState: InitialState = {
  isLogin: false,
};

const AUTH = "auth";

const authSlice = createSlice({
  name: AUTH,
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

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
