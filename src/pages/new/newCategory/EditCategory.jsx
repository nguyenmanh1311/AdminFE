import "../new.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../../services/category.service";

const EditCategory = ({ name }) => {
  const param = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoad] = useState(true);
  const [categories, setCategory] = useState([]);

  //
  const categoryRef = useRef();
  const descriptionRef = useRef();

  const [data, setData] = useState([]);

  useEffect(() => {
    categoryService.getCategoryById(param.categoryId).then((res) => {
      setData(res.data);
    });

    categoryService.getAllCategory().then((res) => {
      setCategory(res.data);
    });
    setLoad(false);
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = categoryRef.current.value;
    const description = descriptionRef.current.value;
    const input = {
      category,
      description,
    };

    categoryService.putCategory(input, param.categoryId).then((res) => {
      return res.data;
    });
    navigate("/categories");
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
                  <label>Phân loại</label>
                  <input
                    name="category"
                    id="category"
                    placeholder=""
                    ref={categoryRef}
                    defaultValue={data.name}
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Mô tả</label>
                  <input
                    id="description"
                    type="text"
                    placeholder=""
                    ref={descriptionRef}
                    defaultValue={data.description}
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

export default EditCategory;
