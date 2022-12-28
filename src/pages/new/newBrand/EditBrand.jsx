import "../new.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import brandService from "../../../services/brand.service";

const EditBrand = ({ name }) => {
  const param = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoad] = useState(true);
  const [brands, setBrand] = useState([]);

  //
  const brandRef = useRef();
  const descriptionRef = useRef();

  const [data, setData] = useState([]);

  useEffect(() => {
    brandService.getBrandById(param.brandId).then((res) => {
      setData(res.data);
    });

    brandService.getAllBrands().then((res) => {
      setBrand(res.data);
    });
    setLoad(false);
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = brandRef.current.value;
    const description = descriptionRef.current.value;
    const input = {
      name,
      description,
    };

    brandService.putBrand(input, param.brandId).then((res) => {
      return res.data;
    });
    setTimeout(() => {
      navigate("/brands");
    }, 300);
  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{name}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formContainer">
                <div className="formInput">
                  <label>Thương hiệu</label>
                  <input
                    name="brand"
                    id="brand"
                    placeholder=""
                    ref={brandRef}
                    defaultValue={data.name}
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Mô tả</label>
                  <input
                    id="description"
                    type="text"
                    ref={descriptionRef}
                    defaultValue={data.description}
                    placeholder=""
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

export default EditBrand;
