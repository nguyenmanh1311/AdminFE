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
    return axiosInstance.delete(`${baseURL.data}/products/${id}`);
  }
  postProduct(product) {
    return axiosInstance.post(`${baseURL.data}/products${product}`);
  }
}

export default new ProductService();
