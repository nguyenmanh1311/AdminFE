import axios from "axios";
import configAPI from "../../src/api/apiConfig.json";

const login = (username, password) => {
  const data = { phone: username, password };
  return axios
    .post(configAPI.baseUrlApi + "/api/v1/auth/login", data)
    .then((response) => {
      try {
        if (response.data.data.accessToken) {
          localStorage.setItem("userId", JSON.stringify(response.data.data.id));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.data.accessToken)
          );
          AddressService.getAddressByUserID(response.data.data.id).then(
            (res) => {
              localStorage.setItem(
                "idAddress",
                JSON.stringify(response.data.data?.id)
              );
            }
          );
        } else {
          alert("Wrong username or password");
        }
      } catch {
      } finally {
        return response.data;
      }
    });
};

const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("accessToken");
};

export const AuthService = {
  login,
  logout,
};
