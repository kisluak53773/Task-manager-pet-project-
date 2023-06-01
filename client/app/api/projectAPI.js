import { authHost, host } from "./index";

export const getProjects = async () => {
  const { data } = await host.get("api/project");
  return data;
};

export const createProject = async (title, description) => {
  const { data } = await authHost.post("api/project", {
    title,
    description,
  });
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await authHost.delete(`api/project/${id}`);
  return data;
};

export const dismissFromProject = async (userId, projectId) => {
  console.log("userId" + userId + " projectId" + projectId);
  const { data } = await authHost.delete("api/userProject/", {
    data: {
      userId,
      projectId,
    },
  });
  return data;
};
