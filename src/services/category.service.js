import { axiosInstance, baseURL } from "~/api/axios.config";

class CategoryService {
  getAllCategory() {
    return axiosInstance.get(`${baseURL.data}/category`).then((res) => {
      return res.data;
    });
  }
  getCategoryById(id) {
    return axiosInstance.get(`${baseURL.data}/category/${id}`);
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

export default new CategoryService();
