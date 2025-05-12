import axios from "axios";
const API_URL_Local = "http://localhost:8082/v1/";
const API_URL_ONLINE = "https://task-management-app-7yzg.onrender.com/v1/";
const API_URL = API_URL_ONLINE;
const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const fileUploadHeaders = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const fileDownloadHeaders = {
  headers: {
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export async function loginApi(data) {
  try {
    const response = await axios.post(`${API_URL}auth/login`, data, headers);
    console.info("Api Login Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function registerApi(data) {
  try {
    const response = await axios.post(`${API_URL}auth/register`, data, headers);
    console.info("Api SignUp Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser() {
  try {
    const response = await axios.get(`${API_URL}auth/user`, headers);
    console.info("Api User Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllTasks() {
  try {
    // console.log(localStorage.getItem("token"));
    const response = await axios.get(`${API_URL}task`, headers);
    console.table(response?.data?.tasks);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getTaskById(id) {
  try {
    const response = await axios.get(`${API_URL}task/${id}`, headers);
    console.info("Api Task Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function createTask(data) {
  try {
    const response = await axios.post(`${API_URL}task`, data, headers);
    console.info("Api Create Task Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function updateTask(id, data) {
  try {
    const response = await axios.put(`${API_URL}task/${id}`, data, headers);
    console.info("Api Update Task Res:", response.data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function deleteTask(id) {
  try {
    const response = await axios.delete(`${API_URL}task/${id}`, headers);
    console.info("Api Delete Task Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function exportTasks(fileType) {
  try {
    const response = await axios.get(`${API_URL}task/export?${fileType==='csv'?'format=csv':''}`, {
      ...fileDownloadHeaders,
      responseType: "blob",
    });

    console.info("Api Export Task Res:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function importTasks(data) {
  try {
    const response = await axios.post(
      `${API_URL}task/import`,
      data,
      fileUploadHeaders
    );
    console.info("Api Import Task Res:", response.data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
