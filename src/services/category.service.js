import { axiosInstance, baseURL } from "~/api/axios.config";

class CategoryService {
  getAllCategory() {
    return axiosInstance.get(`${baseURL.data}/category`).then((res) => {
      return res.data;
    });
  }
  getCategoryById(id) {
    return axiosInstance.get(`${baseURL.data}/category/${id}`).then((res) => {
      return res.data;
    });
  }
  deleteCategoryByID(id) {
    return axiosInstance
      .delete(`${baseURL.data}/category/${id}`)
      .then((res) => {
        return res.data;
      });
  }
  putCategory(input, id) {
    return axiosInstance
      .put(`${baseURL.data}/category/${id}`, input)
      .then((res) => {
        return res.data;
      });
  }
}

export default new CategoryService();
