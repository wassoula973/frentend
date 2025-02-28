import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
  },
  reducers: {
    login(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      if (payload.stayConnected) {
        localStorage.setItem("user", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
      }
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
