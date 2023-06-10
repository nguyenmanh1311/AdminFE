import "../new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../../services/product.service";
import brandService from "../../../services/brand.service";
import categoryService from "../../../services/category.service";
import imageService from "../../../services/image.service";
import swal2 from "sweetalert2";

const colorResources = [
  { label: "Đen", value: 101 },
  { label: "Xám", value: 102 },
  { label: "Trắng", value: 103 },
  { label: "Đỏ", value: 104 },
  { label: "Vàng", value: 105 },
  { label: "Cam", value: 106 },
  { label: "Xanh nước", value: 107 },
  { label: "Xanh lá", value: 108 },
  { label: "Nâu", value: 109 },
  { label: "Hồng", value: 110 },
];

const EditProduct = ({ inputs, name }) => {
  const param = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoad] = useState(true);
  const [arrId, setArrId] = useState([]);
  const [arrFile, setArrFile] = useState([]);
  // const fileRef = useRef();
  // const [file, setFile] = useState(null);
  const [brands, setBrand] = useState([]);
  const [categories, setCate] = useState([]);
  const [images, setImages] = useState([]);
  const [color, setColor] = useState([]);

  //
  const brand = useRef();
  const category = useRef();
  const price = useRef();
  const stand_cost = useRef();
  const nameProduct = useRef();
  const description = useRef();
  const material = useRef();
  const compartment_number = useRef();
  const quantity = useRef();
  const weight = useRef();
  const size = useRef();
  const capacity = useRef();
  const warranty_period = useRef();
  const laptop_size = useRef();
  const water_resistance = useRef();
  // const thumbnail = useRef();
  const isChoose = useRef([]);
  const colorId = colorResources.map((e) => e.value);
  useEffect(() => {
    brandService.getAllBrands().then((res) => {
      setBrand(res.data);
    });
    categoryService.getAllCategory().then((res) => {
      setCate(res.data);
    });
    setLoad(false);
    productService.getProductById(param.productId).then((res) => {
      setArrFile(res.data.product_images);
      const colorData = res.data.colors;
      for (let i = 0; i < colorId.length; i++) {
        if (colorData.includes(colorId[i])) {
          isChoose.current.push(true);
        } else {
          isChoose.current.push(false);
        }
      }
      setColor(colorData);
      brand.current.value = res.data?.brand_id;
      category.current.value = res.data?.category_id;
      price.current.value = res.data?.price;
      stand_cost.current.value = res.data?.stand_cost;
      nameProduct.current.value = res.data?.name;
      description.current.value = res.data?.description;
      material.current.value = res.data?.material;
      compartment_number.current.value = res.data?.compartment_number;
      quantity.current.value = res.data?.quantity;
      weight.current.value = res.data?.weight;
      size.current.value = res.data?.size;
      capacity.current.value = res.data?.capacity;
      warranty_period.current.value = res.data?.warranty_period;
      laptop_size.current.value = res.data?.laptop_size;
      water_resistance.current.value = res.data?.water_resistance;
    });
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const standCost = document.getElementById("stand_cost").value;
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
      productService.updateProduct(param.productId, input).then((res) => {
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
          <h1>{name}</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                data.product_images
                  ? "https://" + data.product_images[0]?.uri
                  : baloDefault
              }
              alt=""
              ref={thumbnail}
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
                  ref={fileRef}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    thumbnail.current.src = URL.createObjectURL(
                      e.target.files[0]
                    );
                  }}
                  style={{ display: "none" }}
                />
              </div> */}

              <div className="formContainer">
                <div className="formInput">
                  <label>Tên sản phẩm</label>
                  <input
                    id="name"
                    type="text"
                    placeholder=""
                    ref={nameProduct}
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Mô tả</label>
                  <input
                    id="description"
                    type="text"
                    placeholder=""
                    ref={description}
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Chất liệu</label>
                  <input
                    id="material"
                    ref={material}
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
                    ref={price}
                  />
                </div>
                <div className="formInput">
                  <label>Giá nhập</label>
                  <input
                    id="stand_cost"
                    type="number"
                    placeholder=""
                    required
                    min="100000"
                    ref={stand_cost}
                  />
                </div>

                <div className="formInput">
                  <label>Số ngăn</label>
                  <input
                    id="compartment_number"
                    type="number"
                    ref={compartment_number}
                    placeholder=""
                    required
                    min="1"
                  />
                </div>
                <div className="formInput">
                  <label>Số lượng</label>
                  <input
                    id="quantity"
                    type="number"
                    ref={quantity}
                    placeholder=""
                    required
                    min="0"
                  />
                </div>

                <div className="formInput">
                  <label>Cân nặng</label>
                  <input
                    id="weight"
                    type="text"
                    ref={weight}
                    placeholder=""
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Kích thước</label>
                  <input
                    id="size"
                    type="text"
                    ref={size}
                    placeholder=""
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Thể tích</label>
                  <input
                    id="capacity"
                    type="text"
                    ref={capacity}
                    placeholder=""
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Bảo hành</label>
                  <input
                    id="warranty_period"
                    type="text"
                    ref={warranty_period}
                    placeholder=""
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Đựng được laptop kích thước</label>
                  <input
                    id="laptop_size"
                    type="text"
                    ref={laptop_size}
                    placeholder=""
                  />
                </div>
                <div className="formInput">
                  <label>Khả năng chống nước</label>
                  <input
                    id="water_resistance"
                    type="text"
                    ref={water_resistance}
                    placeholder=""
                    required
                  />
                </div>
                <div className="color-container">
                  <label>Màu sắc</label>
                  <div className="form-group">
                    <div className="row">
                      {colorResources.map((color, i) => {
                        return (
                          <div className="checkbox" key={i}>
                            <label className="checkbox-container">
                              <input
                                type="checkbox"
                                value={color.value}
                                checked={isChoose.current[i]}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    isChoose.current[i] = true;
                                    setColor((pre) => {
                                      return [...pre, color.value];
                                    });
                                  } else {
                                    isChoose.current[i] = false;
                                    setColor((pre) => {
                                      return pre.filter(
                                        (item) => item !== color.value
                                      );
                                    });
                                  }
                                }}
                              />
                              <span className="checkmark"></span>
                              <div>{color.label}</div>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="formInput">
                <label htmlFor="file1">
                  Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                  {/* <input
                    type="file"
                    id="file1"
                    onChange={(e) => {
                      setArrFile((currentFile) => {
                        return [...currentFile, ...e.target.files];
                      });
                    }}
                    style={{ display: "none" }}
                    multiple
                  /> */}
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
                </label>
              </div>
              <div className="imgcontent flex flex-wrap gap-3">
                {arrFile.length !== 0 &&
                  arrFile.map((item, index) => (
                    <img
                      key={index}
                      src={"https://" + item?.uri}
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

export default EditProduct;
