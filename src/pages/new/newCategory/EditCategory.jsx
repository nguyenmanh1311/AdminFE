import "../new.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../../services/category.service";

const EditCategory = ({ inputs, name }) => {
  const param = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoad] = useState(true);
  const [categories, setCategory] = useState([]);

  //
  const category = useRef();

  const [data, setData] = useState([]);

  useEffect(() => {
    categoryService.getCategoryById(param.categoryId).then((res) => {
      setData(res.data);
      category.current.value = res?.data?.categoryId;
      document.getElementById("description").value = res.data.description;
    });

    categoryService.getAllCategory().then((res) => {
      setCategory(res.data);
    });
    setLoad(false);
  }, [isLoading]);

  const handleSubmit = (e) => {
    var _dataPhone = new FormData();
    e.preventDefault();
    const description = document.getElementById("description").value;

    _dataPhone.append("category", Number(category.current.value));
    _dataPhone.append("description", description);
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
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formContainer">
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
                  <label>Mô tả</label>
                  <input id="description" type="text" placeholder="" required />
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
