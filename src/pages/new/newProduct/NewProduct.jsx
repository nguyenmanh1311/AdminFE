import "../new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { addProductInputs } from "../../../formSource";
import { baseURL_ } from "../../../api/axios.config";
import { useNavigate } from "react-router-dom";
import brandService from "../../../services/brand.service";
import categoryService from "../../../services/category.service";

const NewProduct = ({ inputs, title }) => {
  document.title = "Thêm sản phẩm mới";
  const [file, setFile] = useState(null);
  const [arrFile, setArrFile] = useState([]);
  const [isLoading, setLoad] = useState(true);

  const navigate = useNavigate();
  const [brands, setBrand] = useState([]);
  const [categories, setCate] = useState([]);

  useEffect(() => {
    brandService.getAllBrands().then((res) => {
      setBrand(res.data);
    });
    categoryService.getAllCategory().then((res) => {
      setCate(res.data);
    });
    setLoad(false);
  }, [isLoading]);

  const handleSubmit = (e) => {
    var data = new FormData();
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const standCost = document.getElementById("standCost").value;

    data.append("name", name);
    data.append("description", description);
    data.append("branchId", brand);
    data.append("categoryId", category);
    data.append("price", price);
    data.append("standCost", standCost);
    data.append("image", file);
    data.append("galleryOld", ["nul"]);
    for (let i = 0; i < arrFile.length; i++) {
      data.append("galleryNew", arrFile[i]);
    }
    const x = {
      title,
      name,
      brand,
      price,
      standCost,
      description,
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
                  Hình ảnh đại diện:{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
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
                <div className="formInput">
                  <label>Tên sản phẩm</label>
                  <input id="name" type="text" placeholder="" required />
                </div>
                <div className="formInput">
                  <label>Mô tả</label>
                  <input id="description" type="text" placeholder="" required />
                </div>
                <div className="formInput">
                  <label>Thương hiệu</label>
                  <select
                    name="brand"
                    id="brand"
                    className={`w-full border rounded-md focus:outline-none text-[15px] border-gray-300 shadow-sm sm:text-[15px]`}
                  >
                    {brands.map((item) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                  </select>
                </div>
                <div className="formInput">
                  <label>Phân loại</label>
                  <select
                    name="category"
                    id="category"
                    className={`w-full border rounded-md focus:outline-none text-[15px] border-gray-300 shadow-sm sm:text-[15px]`}
                  >
                    {categories.map((item) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                  </select>
                </div>
                <div className="formInput">
                  <label>Giá bán</label>
                  <input
                    id="price"
                    type="number"
                    placeholder=""
                    required
                    min="100000"
                  />
                </div>
                <div className="formInput">
                  <label>Giá nhập</label>
                  <input
                    id="standCost"
                    type="number"
                    placeholder=""
                    required
                    min="100000"
                  />
                </div>

                {/* <div className="formInput">
                  <label>Số lượng</label>
                  <input
                    id="quantity"
                    type="number"
                    placeholder=""
                    required
                    min="0"
                  />
                </div> */}
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

export default NewProduct;
