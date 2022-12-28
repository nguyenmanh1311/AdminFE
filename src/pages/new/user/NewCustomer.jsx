import "../new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { addProductInputs } from "../../../formSource";
import { baseURL_ } from "../../../api/axios.config";
import { useNavigate } from "react-router-dom";

const NewCustomer = ({ inputs, title }) => {
  document.title = "Thêm sản phẩm mới";
  const [file, setFile] = useState(null);
  const [arrFile, setArrFile] = useState([]);
  const navigate = useNavigate();
  const handleChangeSlug = (titleP, value) => {
    if (titleP === "title") {
      document.getElementById("slug").value = parseStringToSlug(value);
    }
  };

  const parseStringToSlug = (string) => {
    return string.toLowerCase().split(" ").join("-");
  };

  const handleSubmit = (e) => {
    var data = new FormData();
    e.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const gender = document.getElementById("gender").value;
    const birthday = document.getElementById("birthday").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const file = document.getElementById("file").value;

    data.append("fullname", fullname);
    data.append("gender", gender);
    data.append("birthday", birthday);
    data.append("phone", phone);
    data.append("email", email);
    data.append("img", file);
    const x = {
      fullname,
      gender,
      birthday,
      phone,
      email,
    };
    async function postData(url = "", data = new FormData()) {
      const response = await fetch(url, {
        mode: "no-cors",
        method: "POST",
        redirect: "follow",
        body: data,
      });
      return response;
    }
    postData(baseURL_.data + "/users", data).then(() => {
      navigate("/users");
    });
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formContainer">
                <div className="formInput">
                  <label>Họ và tên</label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Ví dụ: Phạm Văn Thắng"
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Giới tính</label>
                  <input
                    id="gender"
                    type="text"
                    placeholder="Ví dụ: Nam"
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Ngày sinh</label>
                  <input
                    id="birthday"
                    type="text"
                    placeholder="Ví dụ: 2001-12-31"
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Số điện thoại</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Ví dụ: 0123456789"
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Ví dụ: anara@gmail.com"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full justify-end px-4 py-2">
                <input
                  className="flex justify-center items-center bg-[#15a0cf] text-white px-9 py-2 hover:cursor-pointer hover:drop-shadow-md"
                  value="Lưu"
                  type="submit"
                />
                <div
                  className="flex justify-center items-center bg-[#ff213f] text-white px-6 hover:cursor-pointer hover:drop-shadow-md"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Trở về
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
