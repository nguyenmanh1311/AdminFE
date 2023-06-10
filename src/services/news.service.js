import { axiosInstance } from "~/api/axios.config";
import configAPI from "../api/apiConfig.json";

class NewsService {
  getAllNews() {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + "/posts")
      .then((res) => {
        return res.data;
      });
  }
  getNewsById(id) {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + `/posts/${id}`)
      .then((res) => {
        return res.data;
      });
  }
  deleteNewsByID(id) {
    return axiosInstance
      .delete(configAPI.baseUrlApiAdmin + `/posts/${id}`)
      .then((res) => {
        return res.data;
      });
  }
  putNews(input, id) {
    return axiosInstance
      .patch(configAPI.baseUrlApiAdmin + `/posts/${id}`, input)
      .then((res) => {
        return res.data;
      });
  }
  createNews(data) {
    return axiosInstance
      .post(configAPI.baseUrlApiAdmin + `/posts`, data)
      .then((res) => {
        return res.data;
      });
  }
}

export default new NewsService();
