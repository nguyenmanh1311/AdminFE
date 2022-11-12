import "../new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { addProductInputs } from "../../../formSource";
import { baseURL_ } from "../../../api/axios.config";
import { useNavigate } from "react-router-dom";

const NewPhone = ({ inputs, title }) => {
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
    const title = document.getElementById("title").value;
    const listPrice = document.getElementById("listPrice").value;
    const standCost = document.getElementById("standCost").value;
    const brand = document.getElementById("brand").value;
    const colors = document.getElementById("colors").value;
    const info = document.getElementById("info").value;
    const slug = document.getElementById("slug").value;
    console.log(slug);
    const screen = document.getElementById("screen").value;
    console.log(screen);
    const os = document.getElementById("os").value;
    const cameraBehind = document.getElementById("cameraBehind").value;
    const cameraBefore = document.getElementById("cameraBefore").value;
    const chip = document.getElementById("chip").value;
    const sim = document.getElementById("sim").value;
    const pin = document.getElementById("pin").value;
    const ram = document.getElementById("ram").value;
    const rom = document.getElementById("rom").value;
    const quantity = Number(document.getElementById("quantity").value);

    data.append("title", title);
    data.append("listPrice", listPrice);
    data.append("standCost", standCost);
    data.append("brand", brand);
    data.append("colors", colors);
    data.append("info", info);
    data.append("slug", slug);
    data.append("screen", screen);
    data.append("os", os);
    data.append("img", file);
    data.append("galleryOld", ["nul"]);
    for (let i = 0; i < arrFile.length; i++) {
      data.append("galleryNew", arrFile[i]);
    }
    data.append("camBack", cameraBehind);
    data.append("camFront", cameraBefore);
    data.append("chip", chip);
    data.append("ram", ram);
    data.append("rom", rom);
    data.append("sim", sim);
    data.append("pin", pin);
    data.append("quantity", quantity);
    const x = {
      title,
      price,
      brand,
      colors,
      info,
      slug,
      screen,
      os,
      cameraBehind,
      cameraBefore,
      chip,
      sim,
      pin,
      ram,
      rom,
      quantity,
      file,
      arrFile,
    };
    console.log(x);
    async function postData(url = "", data = new FormData()) {
      const response = await fetch(url, {
        mode: "no-cors",
        method: "POST",
        redirect: "follow",
        body: data,
      });
      return response;
    }
    postData(baseURL_.data + "/products", data).then((data) => {
      navigate("/products");
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
                    console.log(file);
                  }}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formContainer">
                {addProductInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.title}
                      onChange={(e) =>
                        handleChangeSlug(input.title, e.target.value)
                      }
                      required
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label>Số lượng</label>
                  <input
                    type="number"
                    placeholder={"Số lượng tất cả sản phẩm"}
                    id="quantity"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="file1">
                    Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file1"
                    onChange={(e) => {
                      setArrFile((currentFile) => {
                        return [...currentFile, ...e.target.files];
                      });
                    }}
                    style={{ display: "none" }}
                    multiple
                  />
                </div>
                <div className="imgcontent flex flex-wrap gap-3 border-2 p-5">
                  {arrFile.map((item) => (
                    <img
                      className="drop-shadow-md"
                      src={URL.createObjectURL(item)}
                      alt=""
                      onClick={() => {
                        if (confirm("Bạn có muốn xóa không?")) {
                          setArrFile((currentFile) => {
                            return currentFile.filter((e) => e !== item);
                          });
                        }
                      }}
                    />
                  ))}
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

export default NewPhone;
