import { createSlice } from "@reduxjs/toolkit";

import {
    registerUser,
    loginUser,
    getMe,
    logoutUser
} from "./authThunks";

const initialState = {
    user: null,

    isAuthenticated: false,

    loading: false,

    initialized: false,

    error: null,

    successMessage: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },

        clearAuthSuccess: (state) => {
            state.successMessage = null;
        },

        resetAuth: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.initialized = true;
            state.error = null;
            state.successMessage = null;
        },
    },

    extraReducers: (builder) => {
        /*
        |--------------------------------------------------------------------------
        | Register
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.successMessage =
                    action.payload?.message ||
                    "Registration successful";
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Registration failed";
            });

        /*
        |--------------------------------------------------------------------------
        | Login
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.isAuthenticated = true;

                state.user =
                    action.payload?.user ||
                    action.payload?.data?.user ||
                    null;

                state.successMessage =
                    action.payload?.message ||
                    "Login successful";
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;

                state.error =
                    action.payload || "Login failed";
            });

        /*
        |--------------------------------------------------------------------------
        | Get Me
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(getMe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getMe.fulfilled, (state, action) => {
                state.loading = false;
                state.initialized = true;
                state.isAuthenticated = true;

                state.user =
                    action.payload?.user ||
                    action.payload?.data?.user ||
                    action.payload?.data ||
                    null;

                state.error = null;
            })

            .addCase(getMe.rejected, (state, action) => {
                state.loading = false;
                state.initialized = true;

                state.user = null;
                state.isAuthenticated = false;

                state.error = action.payload || null;
            });

        /*
        |--------------------------------------------------------------------------
        | Logout
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;

                state.user = null;

                state.isAuthenticated = false;

                state.error = null;

                state.successMessage = "Logout successful";
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload || "Logout failed";
            });
    },
});

export const {
    clearAuthError,
    clearAuthSuccess,
    resetAuth,
} = authSlice.actions;

export default authSlice.reducer;