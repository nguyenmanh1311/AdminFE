import { axiosInstance, baseURL } from "~/api/axios.config";
import configAPI from "~/api/apiConfig.json";

class ImageService {
  uploadImage = (file) => {
    return axiosInstance
      .post(configAPI.baseUrlApiMain + "/upload/image", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      });
  };

  saveImage(files = []) {
    return axiosInstance
      .post(`${baseURL.data}/image_product/save`, files)
      .then((res) => {
        return res.data;
      });
  }
  saveImageProduct(data) {
    return axiosInstance
      .post(`${baseURL.data}/image_product/save/image`, data)
      .then((res) => {
        return res.data;
      });
  }
  saveList(data) {
    return axiosInstance
      .post(`${baseURL.data}/image_product/save-list`, data)
      .then((res) => {
        return res.data;
      });
  }
  getImagesByProductId(id) {
    return axiosInstance
      .get(`${baseURL.data}/image_product/product/${id}`)
      .then((res) => {
        return res.data;
      });
  }
  deleteImageByProductId(path, id) {
    return axiosInstance
      .delete(`${baseURL.data}/image_product/${id}/${path}`)
      .then((res) => {
        return res.data;
      });
  }
}

export default new ImageService();
