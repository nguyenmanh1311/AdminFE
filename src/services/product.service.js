import { axiosInstance, baseURL } from "~/api/axios.config";

class ProductService {
  getAllProducts() {
    return axiosInstance.get(`${baseURL.data}/product/all`).then((res) => {
      return res.data;
    });
  }
  getProductById(id) {
    return axiosInstance.get(`${baseURL.data}/product/${id}`).then((res) => {
      return res.data;
    });
  }
  getProductByName(name) {
    return axiosInstance.get(`${baseURL.data}/products/${name}`);
  }
  deleteProductByID(id) {
    return axiosInstance.delete(`${baseURL.data}/product/${id}`);
  }
  updateProduct(id, data) {
    return axiosInstance
      .put(`${baseURL.data}/product/${id}`, data)
      .then((res) => {
        return res.data;
      });
  }
  createNewProduct(data) {
    return axiosInstance.post(`${baseURL.data}/product`, data).then((res) => {
      return res.data;
    });
  }
}

export default new ProductService();
