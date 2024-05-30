import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
};

export const { actions: authActions, reducer: authReducer } = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clear: () => ({
            accessToken: null,
            refreshToken: null,
        }),
        update: (state: AuthState, action: PayloadAction<AuthState>) => ({
            ...state,
            ...action.payload,
        }),
    },
});
