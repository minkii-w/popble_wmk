import { createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../utill/cookieUtill";

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  userProfile: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { accessToken, refreshToken, user, userProfile } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
      state.userProfile = userProfile;
      state.isAuthenticated = true;

      //쿠키에도 동기화
      setCookie(
        "user",
        // 1일동안
        JSON.stringify({ accessToken, refreshToken, user }, 1)
      );
    },

    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.userProfile = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      //쿠키 삭제
      removeCookie("user");
    },
    //유저프로필 수정
    updateUserProfile(state, action) {
      // MyPageEdit에서 프로필 수정 후 호출
      state.userProfile = action.payload;
      const { accessToken, refreshToken, user } = state;
      setCookie(
        "user",
        JSON.stringify(
          { accessToken, refreshToken, user, userProfile: state.userProfile },
          1
        )
      );
    },
    //리프레시 토큰
    refreshTokenSuccess(state, action) {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      const user = state.user;
      setCookie("user", JSON.stringify({ accessToken, refreshToken, user }), 1);
    },
  },
});

export const { loginSuccess, logout, refreshTokenSuccess, updateUserProfile } =
  authSlice.actions;
export default authSlice.reducer;
