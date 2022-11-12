import { axiosInstance, baseURL } from "~/api/axios.config";

export const ReviewService = {
  getReviews() {
    return axiosInstance.get(`${baseURL.data}/rating/`);
  },
  getReviewByProductId(id) {
    return axiosInstance.get(`${baseURL.data}/rating?product=${id}`);
  },
  getProductById(id) {
    return axiosInstance.get(`${baseURL.data}/products?id=${id}`);
  },
  removeReview(id) {
    return axiosInstance.delete(`${baseURL.data}/rating/${id}`);
  }
};

