import "../new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useRef } from "react";
import { addProductInputs } from "../../../formSource";
import { baseURL_ } from "../../../api/axios.config";
import { useNavigate } from "react-router-dom";
import brandService from "../../../services/brand.service";
import categoryService from "../../../services/category.service";
import productService from "../../../services/product.service";
import imageService from "../../../services/image.service";
import swal2 from "sweetalert2";

const NewProduct = ({ inputs, title }) => {
  document.title = "Thêm sản phẩm mới";
  // const [file, setFile] = useState(null);
  const [arrFile, setArrFile] = useState([]);
  const [isLoading, setLoad] = useState(true);
  const [arrId, setArrId] = useState([]);

  const navigate = useNavigate();
  const [brands, setBrand] = useState([]);
  const [categories, setCate] = useState([]);
  const [color, setColor] = useState([]);

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
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const standCost = document.getElementById("standCost").value;
    const quantity = document.getElementById("quantity").value;
    const material = document.getElementById("material").value;
    const compartment_number =
      document.getElementById("compartment_number").value;
    const weight = document.getElementById("weight").value;
    const size = document.getElementById("size").value;
    const capacity = document.getElementById("capacity").value;
    const warranty_period = document.getElementById("warranty_period").value;
    const laptop_size = document.getElementById("laptop_size").value;
    const water_resistance = document.getElementById("water_resistance").value;

    const postData = () => {
      const input = {
        name: name,
        description: description,
        price: price,
        stand_cost: standCost,
        quantity: quantity,
        material: material,
        compartment_number: compartment_number,
        colors: color,
        weight: weight,
        size: size,
        capacity: capacity,
        warranty_period: warranty_period,
        laptop_size: laptop_size,
        water_resistance: water_resistance,
        category_id: category,
        brand_id: brand,
        file_upload_ids: arrId,
      };

      productService.createNewProduct(input).then((res) => {
        if (res.status_code === 200) {
          swal2.fire("Thông báo", "Thêm sản phẩm thành công", "success");
          navigate("/products");
        }
      });
    };
    postData();
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
              {/* <div className="formInput">
                <label htmlFor="file">
                  Hình ảnh đại diện:{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div> */}

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
                  <label>Chất liệu</label>
                  <input id="material" type="text" placeholder="" required />
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
                  <label>Số ngăn</label>
                  <input
                    id="compartment_number"
                    type="number"
                    placeholder=""
                    required
                    min="1"
                  />
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
                <div className="formInput">
                  <label>Số lượng</label>
                  <input
                    id="quantity"
                    type="number"
                    placeholder=""
                    required
                    min="0"
                  />
                </div>

                <div className="formInput">
                  <label>Cân nặng</label>
                  <input id="weight" type="text" placeholder="" required />
                </div>
                <div className="formInput">
                  <label>Kích thước</label>
                  <input id="size" type="text" placeholder="" required />
                </div>
                <div className="formInput">
                  <label>Thể tích</label>
                  <input id="capacity" type="text" placeholder="" required />
                </div>
                <div className="formInput">
                  <label>Bảo hành</label>
                  <input
                    id="warranty_period"
                    type="text"
                    placeholder=""
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Đựng được laptop kích thước</label>
                  <input id="laptop_size" type="text" placeholder="" />
                </div>
                <div className="formInput">
                  <label>Khả năng chống nước</label>
                  <input
                    id="water_resistance"
                    type="text"
                    placeholder=""
                    required
                  />
                </div>
                <div className="color-container">
                  <label>Màu sắc</label>
                  <div className="form-group">
                    <div className="row">
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={101}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== e.target.value
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Đen</div>
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={102}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Xám</div>
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={103}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Trắng</div>
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={104}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Đỏ</div>
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={105}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Vàng</div>
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={106}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Cam</div>
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={109}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Nâu</div>
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={110}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Hồng</div>
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={111}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Tím</div>
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-container d-flex align-items-center">
                          <input
                            type="checkbox"
                            value={108}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Xanh lá</div>
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="checkbox">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            value={107}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColor((pre) => {
                                  return [...pre, Number(e.target.value)];
                                });
                              } else {
                                setColor((pre) => {
                                  return pre.filter(
                                    (item) => item !== Number(e.target.value)
                                  );
                                });
                              }
                            }}
                          />{" "}
                          <span className="checkmark"></span>
                          <div>Xanh dương</div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="formInput">
                <label htmlFor="file1">
                  Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file1"
                  onChange={async (e) => {
                    setArrFile((currentFile) => {
                      return [...currentFile, ...e.target.files];
                    });
                    for (let i = 0; i < e.target.files.length; i++) {
                      var form = new FormData();
                      form.append("image", e.target.files[i]);

                      const res = await imageService.uploadImage(form);
                      if (res.status_code === 200) {
                        setArrId((prev) => {
                          return [...prev, res.data.id];
                        });
                      }
                    }
                  }}
                  style={{ display: "none" }}
                  multiple
                />
              </div>
              <div className="imgcontent flex flex-wrap gap-3 border-2 p-5">
                {arrFile.map((item, index) => (
                  <img
                    className="drop-shadow-md"
                    key={index}
                    src={URL.createObjectURL(item)}
                    alt=""
                    onClick={() => {
                      swal2
                        .fire({
                          title: "Bạn có muốn xóa ảnh này không?",
                          showDenyButton: true,
                          confirmButtonText: "Có",
                          denyButtonText: "Không",
                        })
                        .then((result) => {
                          if (result.isConfirmed) {
                            setArrId((prev) => {
                              return prev.filter((e, i) => i !== index);
                            });
                            setArrFile((currentFile) => {
                              return currentFile.filter((e) => e !== item);
                            });
                          } else if (result.isDenied) {
                          }
                        });
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
