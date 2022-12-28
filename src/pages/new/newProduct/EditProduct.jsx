import "../new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../../services/product.service";
import brandService from "../../../services/brand.service";
import categoryService from "../../../services/category.service";
import imageService from "../../../services/image.service";

const EditProduct = ({ inputs, name }) => {
  const param = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoad] = useState(true);
  const [arrFile, setArrFile] = useState([]);
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [brands, setBrand] = useState([]);
  const [categories, setCate] = useState([]);
  const [images, setImages] = useState([]);
  //
  const brand = useRef();
  const category = useRef();
  const price = useRef();
  const standCost = useRef();
  const nameProduct = useRef();
  const description = useRef();
  const thumbnail = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    brandService.getAllBrands().then((res) => {
      setBrand(res.data);
    });
    categoryService.getAllCategory().then((res) => {
      setCate(res.data);
    });
    setLoad(false);
    productService.getProductById(param.productId).then((res) => {
      setData(res.data);
      brand.current.value = res.data?.branchId;
      category.current.value = res.data?.categoryId;
      price.current.value = res.data?.price;
      standCost.current.value = res.data?.standCost;
      nameProduct.current.value = res.data?.name;
      description.current.value = res.data?.description;
    });
    imageService.getImagesByProductId(param.productId).then((res) => {
      setImages(res.data);
    });
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

    if (file === null) {
      setFile(() => {
        return fileRef.current.files[0];
      });
    }

    function update(input) {
      productService.updateProduct(param.productId, input).then((res) => {
        if (res.status === "OK") {
          const productId = param.productId;
          var form = new FormData();
          for (let i = 0; i < arrFile.length; i++) {
            form.append("image", arrFile[i]);
          }
          if (arrFile.length > 0) {
            imageService.saveImage(form).then((res) => {
              if (res.status === "OK") {
                let images = [];
                for (let i = 0; i < res.data?.length; i++) {
                  images.push(res.data[i]);
                }
                const x = {
                  path: images,
                  productId: Number(productId),
                };
                imageService.saveList(x).then();
              }
            });
          }
        }
      });
    }

    const postData = () => {
      var imageForm = new FormData();
      imageForm.append("image", file);
      if (file != null) {
        imageService.saveImage(imageForm).then((response) => {
          if (response.status === "OK") {
            const image = response.data[0];
            const input = {
              branchId: brand,
              categoryId: category,
              description: description,
              image: image,
              name: name,
              price: price,
              standCost: standCost,
            };
            update(input);
            navigate("/products");
          }
        });
      } else {
        const input = {
          branchId: brand,
          categoryId: category,
          description: description,
          image: data?.image,
          name: name,
          price: price,
          standCost: standCost,
        };
        update(input);
        navigate("/products");
      }
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
          <div className="left">
            <img
              src={"http://localhost:8080/api/v1/user/image/" + data?.image}
              alt=""
              ref={thumbnail}
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
                    thumbnail.current.src = URL.createObjectURL(
                      e.target.files[0]
                    );
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
                      id="standCost"
                      type="number"
                      placeholder=""
                      required
                      min="100000"
                      ref={standCost}
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
                      setArrFile((currentFile) => {
                        return [...currentFile, ...e.target.files];
                      });
                    }}
                    style={{ display: "none" }}
                    multiple
                  />
                </label>
              </div>
              <div className="imgcontent flex flex-wrap gap-3">
                {images.map((img, index) => (
                  <img
                    src={"http://localhost:8080/api/v1/user/image/" + img}
                    alt=""
                    onClick={() => {
                      if (confirm("Bạn có muốn xóa không?")) {
                        setImages((current) => {
                          return current.filter((e) => e !== img);
                        });
                        imageService.deleteImageByProductId(
                          img,
                          param.productId
                        );
                      }
                    }}
                  />
                ))}
                {arrFile.map((item) => {
                  return (
                    <img
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
                  );
                })}
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
