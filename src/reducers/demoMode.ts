import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const DemoModeSlice = createSlice({
    name: "demoMode",
    initialState: {value:false},
    reducers: {
        setDemoMode: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    },
});

export const { setDemoMode } = DemoModeSlice.actions;

export default DemoModeSlice.reducer;
