import { authHost, host } from "./index";
import jwt_decode from "jwt-decode";

export const registerUser = async (email, password, phone, name, img) => {
  var formData = new FormData();
  if (img) {
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("name", name);
    formData.append("img", img);
    formData.append("role", "ADMIN");
  } else {
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("name", name);
    formData.append("role", "ADMIN");
  }
  const { data } = await host.post("api/user/registration", formData);
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const loginUser = async (email, password) => {
  const { data } = await host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const authUser = async () => {
  const { data } = await authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const findAllUsers = async () => {
  const { data } = await authHost.get("api/user/getAll");
  return data;
};

export const appointTask = async (userId, projectId) => {
  console.log("userId" + userId + " projectId" + projectId);
  const { data } = await authHost.post("api/userProject", {
    userId,
    projectId,
  });
  return data;
};
