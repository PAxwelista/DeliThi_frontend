import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Login, defaultLoginValue } from "../types";
import type { RootState } from "../store";
import { saveSecureStore } from "../utils";

export const LoginSlice = createSlice({
    name: "login",
    initialState: defaultLoginValue,
    reducers: {
        setLogin: (state, action: PayloadAction<Login>) => {
            saveSecureStore("refreshToken", action.payload.refreshToken);
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        disconnect: state => {
            state.username = "";
            state.token = "";
            state.role = "";
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { setLogin, disconnect, setAccessToken } = LoginSlice.actions;

export const selectCount = (state: RootState) => state.login;

export default LoginSlice.reducer;
