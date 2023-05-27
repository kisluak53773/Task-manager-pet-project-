"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasks,
  createTask,
  getTaskByProjectId,
  editTask,
  deleteTask,
  commitTime,
  appointTask,
  getUserByTaskId,
  dismissTask,
  getModifiedTasks,
} from "@/app/api/taskAPI";

const initialState = {
  tasks: [],
  isLoading: false,
  appointedUser: {},
  modifyTasks: [],
};

export const addTask = createAsyncThunk(
  "task/create",
  async ({ id, name, description, endDate }) => {
    const task = await createTask(id, name, description, endDate);
    return task;
  }
);

export const fetchTasks = createAsyncThunk("task/fetch", async () => {
  const tasks = await getTasks();
  return tasks;
});

export const fetchTasksByProjectId = createAsyncThunk(
  "tasks/fetchByProjectId",
  async ({ projectId }) => {
    const tasks = await getTaskByProjectId(projectId);
    return tasks;
  }
);

export const modifyTask = createAsyncThunk(
  "task/edit",
  async ({ id, name, description, progress, status }) => {
    const data = await editTask(id, name, description, progress, status);
    return data;
  }
);

export const destroyTask = createAsyncThunk("task/delete", async ({ id }) => {
  const data = await deleteTask(id);
  return data;
});

export const saveTime = createAsyncThunk(
  "task/commitTime",
  async ({ taskId, userId, spentTime }) => {
    const data = await commitTime(taskId, userId, spentTime);
    return data;
  }
);

export const appoint = createAsyncThunk(
  "task/appoint",
  async ({ userId, taskId }) => {
    const data = await appointTask(userId, taskId);
    return data;
  }
);

export const getUserWithTask = createAsyncThunk(
  "task/getUser",
  async ({ task }) => {
    const data = await getUserByTaskId(task);
    return data;
  }
);

export const dismiss = createAsyncThunk(
  "task/dismiss",
  async ({ taskId, userId }) => {
    const data = await dismissTask(taskId, userId);
    return data;
  }
);

export const fetchModifiedTasks = createAsyncThunk(
  "task/fetchModifiedTasks",
  async () => {
    const data = await getModifiedTasks();
    return data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
      throw new Error(action.error.message);
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(addTask.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(fetchTasksByProjectId.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasksByProjectId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasksByProjectId.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(modifyTask.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(destroyTask.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(saveTime.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(appoint.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(getUserWithTask.fulfilled, (state, action) => {
      console.log(state.user);
      state.appointedUser = action.payload;
    });
    builder.addCase(getUserWithTask.rejected, (state, action) => {
      state.appointedUser = {};
    });
    builder.addCase(dismiss.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(fetchModifiedTasks.fulfilled, (state, action) => {
      state.modifyTasks = action.payload;
    });
    builder.addCase(fetchModifiedTasks.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
  },
});

export const {} = taskSlice.actions;

export const getIsLoading = (state) => state.task.isLoading;
export const getAllTasks = (state) => state.task.tasks;
export const getAppointedUser = (state) => state.task.appointedUser;
export const getModifyTasks = (state) => state.task.modifyTasks;

export default taskSlice.reducer;
