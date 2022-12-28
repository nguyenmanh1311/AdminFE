import "../new.scss";
import { baseURL_ } from "../../../api/axios.config";
import { useNavigate } from "react-router-dom";

const NewCategory = ({ inputs, title }) => {
  document.title = "Thêm phân loại mới";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    var data = new FormData();
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    data.append("name", name);
    data.append("description", description);
    const x = {
      name,
      description,
    };
    async function postData(url = "", data = new FormData()) {
      const response = await fetch(url, {
        mode: "no-cors",
        method: "POST",
        redirect: "follow",
        body: data,
      });
      return response;
    }
    postData(baseURL_.data + "/category", data).then(() => {
      navigate("/categories");
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
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formContainer">
                <div className="formInput">
                  <label>Tên phân loại</label>
                  <input id="name" type="text" placeholder="" required />
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

export default NewCategory;
