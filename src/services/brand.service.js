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
  deleteBrandByID(id) {
    return axiosInstance.delete(`${baseURL.data}/brand/${id}`).then((res) => {
      return res.data;
    });
  }
  putBrand(input, id) {
    return axiosInstance
      .put(`${baseURL.data}/brand/${id}`, input)
      .then((res) => {
        return res.data;
      });
  }
}

export default new BrandService();
