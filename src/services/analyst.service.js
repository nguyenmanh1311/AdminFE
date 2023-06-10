import configAPI from "../api/apiConfig.json";
import { axiosInstance, baseURL } from "~/api/axios.config";

class StatisticService {
  getAllAmount() {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + "/statistic")
      .then((res) => {
        return res.data;
      });
  }

  getStaticInvoice() {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + "/statistic/statistic-invoice")
      .then((res) => {
        return res.data;
      });
  }

  getStaticBenefit() {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + "/statistic/statistic-benefit")
      .then((res) => {
        return res.data;
      });
  }
}

export default new StatisticService();
