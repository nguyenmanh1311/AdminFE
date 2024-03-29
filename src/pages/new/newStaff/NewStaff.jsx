import "../new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NewStaff.scss";
import { UserService } from "../../../services/user.service";
import imageService from "../../../services/image.service";
import Swal from "sweetalert2";

const NewStaff = ({ title }) => {
  document.title = "Thêm sản phẩm mới";
  const [file, setFile] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const gender = document.getElementById("gender").value;
    const birthday = document.getElementById("birthday").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (password.length === 0) {
      password = "123456a@";
    }
    const input = {
      fullName: fullname,
      gender: gender,
      dateOfBirth: birthday,
      phone_number: phone,
      email: email,
      role: 2,
      password: password,
    };
    UserService.createStaff(input).then((res) => {
      if (res.data.status_code === 200) {
        navigate("/staffs");
      } else {
        Swal.fire(
          "Thông báo",
          "Số điện thoại hoặc email đã được sử dụng.",
          "warning"
        );
      }
    });
  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
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
                  <DatePicker
                    id="birthday"
                    dateFormat="dd-MM-yyyy"
                    selected={startDate}
                    required
                    onChange={(date) => setStartDate(date)}
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
                <div className="formInput">
                  <label>Mật khẩu</label>
                  <input
                    id="password"
                    type="text"
                    placeholder="Ví dụ: 123456a@"
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

export default NewStaff;
