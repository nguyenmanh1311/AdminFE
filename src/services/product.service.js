import { axiosInstance, baseURL } from "~/api/axios.config";

class ProductService {
  getProducts() {
    return axiosInstance.get(`${baseURL.data}/products`);
  }
  getProduct(id) {
    return axiosInstance.get(`${baseURL.data}/products/${id}`);
  }
  getProductByName(name) {
    return axiosInstance.get(`${baseURL.data}/products/${name}`);
  }
  deleteProductByID(id){
    return axiosInstance.delete(`${baseURL.data}/products/${id}`);
  }
  postProduct(product){
    return axiosInstance.post(`${baseURL.data}/products${product}`);
  }
}

export default new ProductService();
