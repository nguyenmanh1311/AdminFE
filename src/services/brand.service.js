import { axiosInstance, baseURL } from "~/api/axios.config";

class BrandService {
  getAllBrands() {
    return axiosInstance.get(`${baseURL.data}/brand`).then((res) => {
      return res.data;
    });
  }
  getBrandById(id) {
    return axiosInstance.get(`${baseURL.data}/brand/${id}`).then((res) => {
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

export default new BrandService();
