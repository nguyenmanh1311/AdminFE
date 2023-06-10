import { axiosInstance, baseURL } from "~/api/axios.config";
import configAPI from "../api/apiConfig.json";

class CategoryService {
  getAllCategory() {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + "/category")
      .then((res) => {
        return res.data;
      });
  }
  getCategoryById(id) {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + `/category/${id}`)
      .then((res) => {
        return res.data;
      });
  }
  deleteCategoryByID(id) {
    return axiosInstance
      .delete(configAPI.baseUrlApiAdmin + `/category/${id}`)
      .then((res) => {
        return res.data;
      });
  }
  putCategory(input, id) {
    return axiosInstance
      .patch(configAPI.baseUrlApiAdmin + `/category/${id}`, input)
      .then((res) => {
        return res.data;
      });
  }
  createNewCategory(data) {
    return axiosInstance
      .post(configAPI.baseUrlApiAdmin + `/category`, data)
      .then((res) => {
        return res.data;
      });
  }
}

export default new CategoryService();
