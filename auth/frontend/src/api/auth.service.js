import API from "./axios";

export const registerAPI = async (formData) => {
  try {
    console.log(formData);
    const response = await API.post("/auth/register", formData);
    return response;
  } catch (error) {
    console.log("RegisterAPI error", error);
    throw error;
  }
};
export const loginAPI = async (formData) => {
  try {
    const response = await API.post("/auth/login", formData);
    return response;
  } catch (error) {
    console.log("loginAPI error", error);
    throw error;
  }
};
export const logoutAPI = async () => {
  try {
    const response = await API.post("/auth/logout");
    return response;
  } catch (error) {
    console.log("logoutAPI error", error);
    throw error;
  }
};
