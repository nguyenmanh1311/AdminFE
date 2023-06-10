import { axiosInstance } from "~/api/axios.config";
import configAPI from "~/api/apiConfig.json";

export const UserService = {
  getAllUser(input) {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + "/account", { params: input })
      .then((res) => {
        return res.data;
      });
  },
  updateStatus(id) {
    return axiosInstance.put(
      configAPI.baseUrlApiAdmin + `/account/${id}/change-status`
    );
  },
  getUser(id) {
    return axiosInstance.get(configAPI.baseUrlApiAdmin + `/account?id=${id}`);
  },

  createStaff(data) {
    return axiosInstance.post(
      configAPI.baseUrlApiAdmin + `/account/create-account`,
      data
    );
  },
};
