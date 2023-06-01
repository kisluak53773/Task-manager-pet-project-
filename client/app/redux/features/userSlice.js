"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  authUser,
  findAllUsers,
  appointTask,
} from "@/app/api/userAPI";

const initialState = {
  isAuth: false,
  user: {},
  isLoading: false,
  users: [],
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const user = await loginUser(email, password);
    return user;
  }
);

export const registration = createAsyncThunk(
  "user/register",
  async ({ email, password, phone, name, img }) => {
    const user = await registerUser(email, password, phone, name, img);
    return user;
  }
);

export const auth = createAsyncThunk("user/auth", async () => {
  const data = await authUser();
  return data;
});

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const data = await findAllUsers();
    return data;
  }
);

export const appointmentToProject = createAsyncThunk(
  "user/appointProject",
  async ({ userId, projectId }) => {
    const data = await appointTask(userId, projectId);
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuth = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      throw new Error(action.error.message);
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      throw new Error(action.error.message);
    });
    builder.addCase(auth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(auth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(auth.rejected, (state, action) => {
      state.isLoading = false;
      throw new Error(action.error.message);
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(appointmentToProject.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
  },
});

export const { logoutUser } = userSlice.actions;

export const getIsLoading = (state) => state.user.isLoading;
export const getIsAuth = (state) => state.user.isAuth;
export const getUser = (state) => state.user.user;
export const getAllUsers = (state) => state.user.users;

export default userSlice.reducer;
