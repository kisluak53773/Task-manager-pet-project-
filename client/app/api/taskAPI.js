import { authHost, host } from ".";

export const getTasks = async () => {
  const { data } = await host.get("api/task");
  return data;
};

export const createTask = async (id, name, description, endDate) => {
  const { data } = await authHost.post("api/task", {
    id,
    name,
    description,
    endDate,
  });
  return data;
};

export const getTaskByProjectId = async (projectId) => {
  const { data } = await host.get(`api/task/${projectId}`);
  return data;
};

export const editTask = async (id, name, description, progress, status) => {
  const { data } = await authHost.patch(`api/task/${id}`, {
    id,
    name,
    description,
    progress,
    status,
  });
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await authHost.delete(`api/task/${id}`);
  return data;
};

export const commitTime = async (taskId, userId, spentTime) => {
  console.log(
    "taskId: " + taskId + "userId: " + userId + " spentTime: " + spentTime
  );
  const { data } = await authHost.patch("api/userTask", {
    taskId,
    userId,
    spentTime,
  });
  return data;
};

export const getUserByTaskId = async (task) => {
  const { data } = await authHost.get(`api/userTask/${task.id}`);
  return data;
};

export const appointTask = async (userId, taskId) => {
  const { data } = await authHost.post("api/userTask", {
    userId,
    taskId,
  });
  return data;
};

export const dismissTask = async (taskId, userId) => {
  const { data } = await authHost.patch("api/userTask/dismiss", {
    taskId,
    userId,
  });
  return data;
};

export const getModifiedTasks = async () => {
  const { data } = await authHost.get("/api/userTask");
  return data;
};
