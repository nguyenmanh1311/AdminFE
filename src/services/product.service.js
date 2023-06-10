import { axiosInstance, baseURL } from "~/api/axios.config";
import configApi from "../api/apiConfig.json";

class ProductService {
  getAllProducts(data) {
    return axiosInstance
      .get(configApi.baseUrlApiAdmin + "/product", { params: data })
      .then((res) => {
        return res.data;
      });
  }
  getProductById(id) {
    return axiosInstance
      .get(configApi.baseUrlApiAdmin + `/product/${id}`)
      .then((res) => {
        return res.data;
      });
  }
  getProductByName(name) {
    return axiosInstance.get(configApi.baseUrlApiAdmin + `/products/${name}`);
  }
  deleteProductByID(id) {
    return axiosInstance.delete(configApi.baseUrlApiAdmin + `/product/${id}`);
  }
  updateProduct(id, data) {
    return axiosInstance
      .put(configApi.baseUrlApiAdmin + `/product/${id}`, data)
      .then((res) => {
        return res.data;
      });
  }
  createNewProduct(data) {
    return axiosInstance
      .post(configApi.baseUrlApiAdmin + `/product`, data)
      .then((res) => {
        return res.data;
      });
  }
}

export default new ProductService();
