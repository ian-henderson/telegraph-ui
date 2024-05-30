import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import camelcaseKeys from "camelcase-keys";

import { createParamString } from "../common";

const API_URL = "http://127.0.0.1:8000";

export const accountApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/account/`,
    }),
    endpoints: builder => ({
        changePassword: builder.mutation({
            query: (body: { password: string; token: string }) => ({
                body,
                method: "POST",
                url: "password/change/",
            }),
        }),
        login: builder.mutation({
            query: (body: { email: string; password: string }) => ({
                body,
                method: "POST",
                url: "token/",
            }),
        }),
        register: builder.mutation({
            query: (body: {
                email: string;
                password: string;
                username: string;
            }) => ({
                body,
                method: "POST",
                url: "register/",
            }),
        }),
        resetPassword: builder.mutation({
            query: (body: { email: string }) => ({
                body,
                method: "POST",
                url: "password/reset/",
            }),
        }),
        verifyPasswordResetToken: builder.mutation({
            query: (body: { token: string }) => ({
                body,
                method: "POST",
                url: "password/reset/verify/",
            }),
        }),
    }),
    reducerPath: "accountApi",
});

export const {
    useChangePasswordMutation,
    useLoginMutation,
    useRegisterMutation,
    useResetPasswordMutation,
    useVerifyPasswordResetTokenMutation,
} = accountApi;

export const accountUserApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/account/user/`,
        prepareHeaders: (headers, { getState }) => {
            // @ts-ignore
            const { accessToken } = getState().auth;

            if (accessToken)
                headers.set("Authorization", `Bearer ${accessToken}`);

            return headers;
        },
    }),
    endpoints: builder => ({
        getUserList: builder.query({
            query: (page = 1) => ({ url: `?page=${page}` }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
        }),
        searchUser: builder.query({
            query: ({ page, q }: { page?: number; q?: string }) => {
                const params: { [key: string]: number | string | undefined } =
                    {};

                if (typeof page === "number" && page > 1) params.page = page;

                if (q) params.q = q;

                return { url: `search${createParamString(params)}` };
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
        }),
    }),
    reducerPath: "accountUserApi",
});

export const { useGetUserListQuery, useLazySearchUserQuery } = accountUserApi;
