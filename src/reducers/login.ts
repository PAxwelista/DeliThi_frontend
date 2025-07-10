import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { Login } from "../types";
import type { RootState } from '../../App'

const initialState : Login = {
    username: "" ,
    groupId: "",
    role : ""
} ;

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin: (state , action : PayloadAction<Login>) => {
            state.username = action.payload.username
            state.groupId = action.payload.groupId
            state.role = action.payload.role
        },
    },
});

export const { setLogin } = LoginSlice.actions;

export const selectCount = (state: RootState) => state.login


export default LoginSlice.reducer;
