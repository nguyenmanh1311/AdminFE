import axios from "axios";
import configAPI from "../../src/api/apiConfig.json";
import { axiosInstance } from "../api/axios.config";
import Swal from "sweetalert2";
import jwt from "jwt-decode";

const login = (username, password) => {
  const data = { username, password };
  return axios
    .post(configAPI.baseUrlApiAuth + "/auth/sign-in", data)
    .then((response) => {
      const user = jwt(response.data.data.access_token);

      if (response.data.status_code === 200) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.data.access_token)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.data.refresh_token)
        );
        localStorage.setItem(
          "Fullname",
          JSON.stringify(response.data.data.fullname)
        );
        if (user.role !== "1" && user.role !== "2") {
          localStorage.clear();
          Swal.fire(
            "Thông báo",
            "Số điện thoại hoặc mật khẩu không đúng",
            "error"
          );
        }
      }
    })
    .catch(() => {
      Swal.fire(
        "Thông báo",
        "Số điện thoại đăng ký hoặc mật chưa đúng",
        "error"
      );
    });
};

const logout = () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const data = {
    refresh_token: refreshToken,
  };
  return axiosInstance
    .patch(configAPI.baseUrlApiAuth + "/auth/sign-out", data)
    .then((response) => {
      if (response.data.status_code === 200) {
        localStorage.clear();
      }
    })
    .catch(() => {
      Swal.fire("Lỗi hệ thống", "Thông báo", "error");
    });
};

export const AuthService = {
  login,
  logout,
};
