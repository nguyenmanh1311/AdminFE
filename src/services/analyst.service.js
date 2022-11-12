import { axiosInstance, baseURL } from "~/api/axios.config";

class StatisticService {
	getAmountOrder() {
		return axiosInstance.get(`${baseURL.data}/statistic/order`);
	}
	getAmountProduct() {
		return axiosInstance.get(`${baseURL.data}/statistic/product`);
	}
	getAmountCustomer() {
		return axiosInstance.get(`${baseURL.data}/statistic/customer`);
	}
	getAmountRevenue() {
		return axiosInstance.get(`${baseURL.data}/statistic/revenue`);
	}
	getAmountSixMonth() {
		return axiosInstance.get(`${baseURL.data}/statistic/six_month`);
	}
	getProfit() {
		return axiosInstance.get(`${baseURL.data}/statistic/profit`);
	}
}

export default new StatisticService();
