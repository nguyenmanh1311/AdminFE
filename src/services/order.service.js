import { axiosInstance, baseURL } from "~/api/axios.config";

export const OrderService = {
  getAllOrder() {
    return axiosInstance.get(`${baseURL.data}/invoice`);
  },

  get8Transction() {
    return axiosInstance.get(`${baseURL.data}/invoice/top8nearest`);
  },

  updateHistoryOrder(data) {
    return axiosInstance.post(`${baseURL.data}/invoice`, data);
  },

  getAllOrderDetailByOrderId(id) {
    return axiosInstance.get(`${baseURL.data}/invoice-detail/` + id);
  },
};
