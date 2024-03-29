import { axiosInstance } from "~/api/axios.config";
import configAPI from "../api/apiConfig.json";

class BrandService {
  getAllBrands(data) {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + `/brand`, { params: data })
      .then((res) => {
        return res.data;
      });
  }
  getBrandById(id) {
    return axiosInstance
      .get(configAPI.baseUrlApiAdmin + `/brand/${id}`)
      .then((res) => {
        return res.data;
      });
  }
  deleteBrandByID(id) {
    return axiosInstance
      .delete(configAPI.baseUrlApiAdmin + `/brand/${id}`)
      .then((res) => {
        return res.data;
      });
  }
  putBrand(input, id) {
    return axiosInstance
      .patch(configAPI.baseUrlApiAdmin + `/brand/${id}`, input)
      .then((res) => {
        return res.data;
      });
  }
  createNewBrand(data) {
    return axiosInstance
      .post(configAPI.baseUrlApiAdmin + `/brand`, data)
      .then((res) => {
        return res.data;
      });
  }
}

export default new BrandService();
