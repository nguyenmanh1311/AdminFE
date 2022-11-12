import "../new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useRef } from "react";
import { productInputs, phoneProduct } from "../../../formSource";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "~/services";
import { baseURL_ } from "../../../api/axios.config";

const EditProduct = ({ inputs, title }) => {
  const param = useParams();
  const navigate = useNavigate();
  const [arrFile, setArrFile] = useState([]);
  const [isLoading, setLoad] = useState(true);
  const [fileInput, setFileInput] = useState([]);
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  let dataPhone = {
    id: 1,
    title: "Samsung Galaxy M53",
    price: "12490000",
    url: "/dtdd/samsung-galaxy-m53",
    slug: "samsung-galaxy-m53",
    promotion: "Trả góp 0%",
    discount: 0.2,
    tag: "Ưu đãi sinh nhật",
    gift: "",
    star: 4.1,
    totalVote: 23,
    brand: "samsung",
    category: "dienthoai",
    brandId: 1,
    cateId: 1,
    baohanh: "18T",
    new: true,
    location: "Tỉnh Long Xuyên",
    gallery: [
      "https://cdn.tgdd.vn/Products/Images/42/247364/Slider/2-1020x570.jpg",
      "https://cdn.tgdd.vn/Products/Images/42/247364/Slider/2-1020x570.jpg",
      "https://cdn.tgdd.vn/Products/Images/42/247364/Slider/3-1020x570.jpg",
      "https://cdn.tgdd.vn/Products/Images/42/247364/Slider/SamsungGalaxyM53-1020x570.jpg",
      "https://cdn.tgdd.vn/Products/Images/42/247364/Slider/5-1020x570.jpg",
      "https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11",
    ],
    colors: ["Nâu", "Xanh dương", "Xanh lá"],
    RAM: ["4 GB", "8 GB"],
    ROM: "128 GB",
    nameType: "tainghe",
    parameter: {
      img: "https://cdn.tgdd.vn/Products/Images/42/247364/Kit/samsung-galaxy-m53-note.jpg",
      SCREEN: "IPS LCD6.71 HD+",
      "Hệ điều hành": "Android 11",
      "Camera sau": "Chính 13 MP & Phụ 2 MP",
      "Camera trước": "5 MP",
      Chip: "JLQ JR510 8 nhân",
      RAM: ["4 GB", "8 GB"],
      ROM: "64 GB",
      SIM: "2 Nano SIMHỗ trợ 4G",
      "Pin, Sạc": "6000 mAh18 W",
    },
    info: "<h3>Điện thoại iPhone 13 Pro Max 128 GB - siêu phẩm được mong chờ nhất ở nửa cuối năm 2021 đến từ Apple. Máy có thiết kế không mấy đột phá khi so với người tiền nhiệm, bên trong đây vẫn là một sản phẩm có màn hình siêu đẹp, tần số quét được nâng cấp lên 120 Hz mượt mà, cảm biến camera có kích thước lớn hơn, cùng hiệu năng mạnh mẽ với sức mạnh đến từ Apple A15 Bionic, sẵn sàng cùng bạn chinh phục mọi thử thách.</h3><h3>Thiết kế đẳng cấp hàng đầu</h3><p>iPhone mới kế thừa thiết kế đặc trưng từ iPhone 12 Pro Max khi sở hữu khung viền vuông vức, mặt lưng kính cùng màn hình tai thỏ tràn viền nằm ở phía trước.</p>",
  };
  const [data, setData] = useState([dataPhone]);
  useEffect(() => {
    ProductService.getProduct(param.productId).then((res) => {
      setData(res.data);
      console.log(res.data);
      document.getElementById("title").value = res.data.title;
      document.getElementById("listPrice").value = res.data.price;
      document.getElementById("standCost").value = res.data.standCost;
      document.getElementById("brand").value = res.data.brand;
      document.getElementById("quantity").value = res.data.quantity;
      if (res.data.colors) {
        document.getElementById("colors").value = res.data.colors[0];
        for (let i = 1; i < res.data.colors.length; i++) {
          document.getElementById("colors").value += ", " + res.data.colors[i];
        }
      }
      document.getElementById("info").value = res.data.info;
      document.getElementById("slug").value = res.data.slug;
      if (res.data.parameter.ram) {
        document.getElementById("ram").value = res.data.parameter.ram[0];
        for (let i = 1; i < res.data.parameter.ram.length; i++) {
          document.getElementById("ram").value +=
            ", " + res.data.parameter.ram[i];
        }
      }
      document.getElementById("rom").value = res.data.parameter.rom;
      document.getElementById("screen").value = res.data.parameter.screen;
      document.getElementById("os").value = res.data?.parameter.os;
      document.getElementById("cameraBehind").value =
        res.data.parameter.camBack;
      document.getElementById("cameraBefore").value =
        res.data.parameter.camFront;
      document.getElementById("chip").value = res.data.parameter.chip;
      document.getElementById("sim").value = res.data.parameter.sim;
      document.getElementById("pin").value = res.data.parameter.pin;
      setArrFile(res.data.gallery);
    });
    setLoad(false);
  }, [isLoading]);

  const handleSubmit = (e) => {
    var _dataPhone = new FormData();
    e.preventDefault();
    const title = document.getElementById("title").value;
    const listPrice = document.getElementById("listPrice").value;
    const standCost = document.getElementById("standCost").value;
    const brand = document.getElementById("brand").value;
    const colors = document.getElementById("colors").value;
    const info = document.getElementById("info").value;
    const slug = document.getElementById("slug").value;
    const screen = document.getElementById("screen").value;
    const os = document.getElementById("os").value;
    const cameraBehind = document.getElementById("cameraBehind").value;
    const cameraBefore = document.getElementById("cameraBefore").value;
    const chip = document.getElementById("chip").value;
    const sim = document.getElementById("sim").value;
    const pin = document.getElementById("pin").value;
    const ram = document.getElementById("ram").value;
    const rom = document.getElementById("rom").value;
    const quantity = Number(document.getElementById("quantity").value);
    if (file === null) {
      setFile(() => {
        return fileRef.current.files[0];
      });
    }
    _dataPhone.append("title", title);
    _dataPhone.append("listPrice", listPrice);
    _dataPhone.append("standCost", standCost);
    _dataPhone.append("brand", brand);
    _dataPhone.append("colors", colors);
    _dataPhone.append("info", info);
    _dataPhone.append("slug", slug);
    _dataPhone.append("screen", screen);
    _dataPhone.append("os", os);
    _dataPhone.append("img", file);

    for (let i = 0; i < arrFile.length; i++) {
      _dataPhone.append("galleryOld", arrFile[i]);
    }
    for (let i = 0; i < fileInput.length; i++) {
      _dataPhone.append("galleryNew", fileInput[i]);
    }
    _dataPhone.append("camBack", cameraBehind);
    _dataPhone.append("camFront", cameraBefore);
    _dataPhone.append("chip", chip);
    _dataPhone.append("ram", ram);
    _dataPhone.append("rom", rom);
    _dataPhone.append("sim", sim);
    _dataPhone.append("pin", pin);
    _dataPhone.append("quantity", quantity);
    console.log(standCost);
    async function postData(url = "", data = new FormData()) {
      const response = await fetch(url, {
        method: "PUT",
        redirect: "follow",
        body: data,
      });
      console.log(response);
      return response;
    }

    postData(baseURL_.data + "/products/" + data.id, _dataPhone).then(
      (data) => {
        console.log(data);
      }
    );
    navigate("/products");
  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={data?.img} alt="" />
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
                  {productInputs.map((input) => {
                    return (
                      <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        <input
                          type={input.type}
                          placeholder={input.placeholder}
                          id={input.title}
                        />
                      </div>
                    );
                  })}

                  <>
                    <div className="formInput">
                      <label>RAM</label>
                      <input type="text" placeholder={"Nhập RAM"} id="ram" />
                    </div>
                    <div className="formInput">
                      <label>ROM</label>
                      <input type="text" placeholder={"Nhập ROM"} id="rom" />
                    </div>
                    <div className="formInput">
                      <label>Số lượng</label>
                      <input
                        type="number"
                        placeholder={"Số lượng của tất cả các loại"}
                        id="quantity"
                      />
                    </div>
                    {phoneProduct.map((input) => (
                      <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        <input
                          type={input.type}
                          placeholder={input.placeholder}
                          id={input.title}
                        />
                      </div>
                    ))}
                  </>
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
                      console.log(fileInput);
                    }}
                    style={{ display: "none" }}
                    multiple
                  />
                </label>
              </div>
              <div className="imgcontent flex flex-wrap gap-3">
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
