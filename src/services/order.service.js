import { axiosInstance, baseURL } from "~/api/axios.config";


export const orderService = {
    getAllOrder() {
        return axiosInstance.get(`${baseURL.data}/orders/`);
    },


    updateHistoryOrder(id, data) {
        return axiosInstance.patch(`${baseURL.data}/orders/${id}`, data);
    },

};
