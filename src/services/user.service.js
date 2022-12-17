import { axiosInstance, baseURL } from "~/api/axios.config";

const accessToken = localStorage.getItem("accessToken");

export const UserService = {
  getUsers() {
    return axiosInstance.get(`${baseURL.data}/user`);
  },
  updateStatus(id) {
    return axiosInstance.put(`${baseURL.data}/user/status/${id}`);
  },
  getUser(id) {
    return axiosInstance.get(`${baseURL.data}/user?id=${id}`);
  },
  removeUser(id) {
    return axiosInstance.delete(`${baseURL.data}/user/${id}`);
  },
  editUser(id, data) {
    return axiosInstance.patch(`${baseURL.data}/user/${id}`, data);
  },
  addUser(data) {
    return axiosInstance.post(`${baseURL.data}/user`, data);
  },
};
