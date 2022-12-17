import "../new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../../services/product.service";
import brandService from "../../../services/brand.service";
import categoryService from "../../../services/category.service";

const EditProduct = ({ inputs, name }) => {
  const param = useParams();
  const navigate = useNavigate();
  const [arrFile, setArrFile] = useState([]);
  const [isLoading, setLoad] = useState(true);
  const [fileInput, setFileInput] = useState([]);
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [brands, setBrand] = useState([]);
  const [categories, setCate] = useState([]);

  //
  const brand = useRef();
  const category = useRef();

  const [data, setData] = useState([]);

  useEffect(() => {
    productService.getProductById(param.productId).then((res) => {
      setData(res.data);
      brand.current.value = res?.data?.branchId;
      document.getElementById("name").value = res.data?.name;
      document.getElementById("standCost").value = res.data.standCost;
      document.getElementById("price").value = res.data.price;
      document.getElementById("description").value = res.data.description;
      setArrFile(res.data.gallery);
    });

    brandService.getAllBrands().then((res) => {
      setBrand(res.data);
    });
    categoryService.getAllCategory().then((res) => {
      setCate(res.data);
    });
    setLoad(false);
  }, [isLoading]);

  const handleSubmit = (e) => {
    var _dataPhone = new FormData();
    e.preventDefault();
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const standCost = document.getElementById("standCost").value;
    const price = document.getElementById("price").value;
    if (file === null) {
      setFile(() => {
        return fileRef.current.files[0];
      });
    }
    _dataPhone.append("name", name);
    _dataPhone.append("brand", Number(brand.current.value));
    _dataPhone.append("category", category);
    _dataPhone.append("standCost", standCost);
    _dataPhone.append("price", price);
    // async function postData(url = "", data = new FormData()) {
    //   const response = await fetch(url, {
    //     method: "PUT",
    //     redirect: "follow",
    //     body: data,
    //   });
    //   return response;
    // }

    // postData(baseURL_.data + "/products/" + data.id, _dataPhone).then(
    //   (data) => {}
    // );
    // navigate("/products");
    console.log(..._dataPhone);
  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{name}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={"http://localhost:8080/api/v1/user/image/" + data?.image}
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
                  ref={fileRef}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    data.img = URL.createObjectURL(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div>
              {
                <div className="formContainer">
                  <div className="formInput">
                    <label>Tên sản phẩm</label>
                    <input
                      id="name"
                      type="text"
                      placeholder=""
                      required
                      value={data.name}
                    />
                  </div>
                  <div className="formInput">
                    <label>Mô tả</label>
                    <input
                      id="description"
                      type="text"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="formInput">
                    <label>Thương hiệu</label>
                    <select
                      name="brand"
                      id="brand"
                      ref={brand}
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
                      ref={category}
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
                </div>
              }
              <div className="formInput">
                <label htmlFor="file1">
                  Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                  <input
                    type="file"
                    id="file1"
                    onChange={(e) => {
                      setFileInput((currentFile) => {
                        return [...currentFile, ...e.target.files];
                      });
                    }}
                    style={{ display: "none" }}
                    multiple
                  />
                </label>
              </div>
              {/* <div className="imgcontent flex flex-wrap gap-3">
                {arrFile.map((img, index) => (
                  <img
                    src={img}
                    alt=""
                    onClick={() => {
                      if (confirm("Bạn có muốn xóa không?")) {
                        setArrFile((current) => {
                          return current.filter((e) => e !== img);
                        });
                      }
                    }}
                  />
                ))}
                {fileInput.map((item) => {
                  return (
                    <img
                      src={URL.createObjectURL(item)}
                      alt=""
                      onClick={() => {
                        if (confirm("Bạn có muốn xóa không?")) {
                          setFileInput((currentFile) => {
                            return currentFile.filter((e) => e !== item);
                          });
                        }
                      }}
                    />
                  );
                })}
              </div> */}
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

export default EditProduct;
