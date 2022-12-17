import { axiosInstance, baseURL } from "~/api/axios.config";

class StatisticService {
  //   getAmountSixMonth() {
  //     return axiosInstance.get(`${baseURL.data}/statistic/six_month`);
  //   }
  //   getProfit() {
  //     return axiosInstance.get(`${baseURL.data}/statistic/profit`);
  //   }
  getAllAmount() {
    return axiosInstance.get(`${baseURL.data}/statistical`);
  }
}

export default new StatisticService();
