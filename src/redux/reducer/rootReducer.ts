import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // 다른 슬라이스 추가
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
