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
  getStaff(id) {
    return axiosInstance.get(`${baseURL.data}/user/admin/${id}`).then((res) => {
      return res.data;
    });
  },

  createStaff(data) {
    return axiosInstance.post(`${baseURL.data}/user/admin/create`, data);
  },
};
