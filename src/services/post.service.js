import { axiosInstance, baseURL } from "~/api/axios.config";
import configApi from "../api/apiConfig.json";

const createNewPost = (payload) => {
  return axiosInstance
    .post(configApi.baseUrlApiAdmin + "/posts", payload)
    .then((response) => {
      return response;
    });
};

export const PostService = {
  createNewPost,
};
