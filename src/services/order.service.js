import { axiosInstance, baseURL } from "~/api/axios.config";
import configApi from "../api/apiConfig.json";

export const OrderService = {
  getAllOrder(data) {
    return axiosInstance
      .get(configApi.baseUrlApiAdmin + "/invoice", { params: data })
      .then((res) => {
        return res.data;
      });
  },

  get8Transction() {
    const input = {
      page_count: 8,
      order_by: "CreatedAt desc",
    };
    return axiosInstance
      .get(configApi.baseUrlApiAdmin + "/invoice", { params: input })
      .then((res) => {
        return res.data;
      });
  },

  updateStatusOrder(id, data) {
    return axiosInstance.patch(
      configApi.baseUrlApiAdmin + `/invoice/${id}`,
      data
    );
  },

  getDetailOrderById(id) {
    return axiosInstance
      .get(configApi.baseUrlApiAdmin + "/invoice/" + id)
      .then((res) => {
        return res.data;
      });
  },
};
