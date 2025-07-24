import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Login } from "../types";
import type { RootState } from "../store";

const initialState: Login = {
    username: "",
    token: "",
    role: "",
};

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<Login>) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        disconnect: state => {
            state.username = "";
            state.token = "";
            state.role = "";
        },
        setAccessToken :(state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { setLogin, disconnect ,setAccessToken} = LoginSlice.actions;

export const selectCount = (state: RootState) => state.login;

export default LoginSlice.reducer;
