import { axiosInstance, baseURL } from "~/api/axios.config";

export const CommentService = {
  getComments(page, limit) {
    return axiosInstance.get(`${baseURL.data}/comments/`);
  },
  getCommentByProductId(id) {
    return axiosInstance.get(`${baseURL.data}/comments/product/${id}`);
  },
  getProductById(id) {
    return axiosInstance.get(`${baseURL.data}/products?id=${id}`);
  },
  removeComment(id) {
    return axiosInstance.delete(`${baseURL.data}/comments/${id}`);
  },
  repairComment(id,data) {
    return axiosInstance.patch(`${baseURL.data}/comments/${id}`,data);
  },
  postComment(data){
    return axiosInstance.post(`${baseURL.data}/comments/`,data);
  }
};

