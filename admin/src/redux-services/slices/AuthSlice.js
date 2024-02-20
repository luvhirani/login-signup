import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userAccessToken: "",
};

const AuthSlices = createSlice({
  name: "authSlices",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
      state.userAccessToken = localStorage.getItem('token');
    },
    setAuthLogout: (state) => {
      state.isAuthenticated = false;
      state.userAccessToken = "";
      localStorage.clear();
    },
  },
});

const { reducer, actions } = AuthSlices;
export const { setAuth, setAuthLogout } = actions;
export default reducer;
