"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjects,
  createProject,
  deleteProject,
} from "@/app/api/projectAPI";

const initialState = {
  projects: [],
  isLoading: false,
  beingDeleted: "",
};

export const addProject = createAsyncThunk(
  "project/create",
  async ({ title, description }) => {
    const project = await createProject(title, description);
    return project;
  }
);

export const fetchProjects = createAsyncThunk("project/fetch", async () => {
  const projects = await getProjects();
  return projects;
});

export const destroyProject = createAsyncThunk(
  "project/destroy",
  async ({ id }) => {
    const project = await deleteProject(id);
    return project;
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setBeingDeleted: (state, action) => {
      state.beingDeleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      throw new Error(action.error.message);
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.projects.push(action.payload);
    });
    builder.addCase(addProject.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
    builder.addCase(destroyProject.fulfilled, (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== state.beingDeleted
      );
      state.setBeingDeleted = "";
    });
    builder.addCase(destroyProject.rejected, (state, action) => {
      throw new Error(action.error.message);
    });
  },
});

export const { setBeingDeleted } = projectSlice.actions;

export const getIsLoading = (state) => state.project.isLoading;
export const getAllProjects = (state) => state.project.projects;

export default projectSlice.reducer;
