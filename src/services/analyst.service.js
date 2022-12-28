import { axiosInstance, baseURL } from "~/api/axios.config";

class StatisticService {
  getAmountSixMonth() {
    return axiosInstance.get(
      `${baseURL.data}/statistical/seven_day_recent_line_chart`
    );
  }
  getAmountSixMonthInvoice() {
    return axiosInstance.get(
      `${baseURL.data}/statistical/seven_day_recent_line_chart_invoice`
    );
  }
  //   getProfit() {
  //     return axiosInstance.get(`${baseURL.data}/statistic/profit`);
  //   }
  getAllAmount() {
    return axiosInstance.get(`${baseURL.data}/statistical`);
  }
}

export default new StatisticService();
