import { configureStore } from "@reduxjs/toolkit";

import { accountApi, accountUserApi } from "../services";
import { authReducer } from "./auth";

const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            accountApi.middleware,
            accountUserApi.middleware,
        ),
    reducer: {
        [accountApi.reducerPath]: accountApi.reducer,
        [accountUserApi.reducerPath]: accountUserApi.reducer,
        auth: authReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
