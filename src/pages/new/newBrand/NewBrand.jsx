import "../new.scss";
import { useNavigate } from "react-router-dom";
import brandService from "../../../services/brand.service";
import swal2 from "sweetalert2";

const NewBrand = ({ inputs, title }) => {
  document.title = "Thêm thương hiệu mới";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    const postData = () => {
      const input = {
        name: name,
        description: description,
      };

      brandService.createNewBrand(input).then((res) => {
        if (res.status_code === 200) {
          swal2.fire("Thông báo", "Thêm thương hiệu thành công", "success");
          navigate("/brands");
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
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 items-start justify-center">
                  <label>Tên thương hiệu</label>
                  <input
                    className="border w-[400px]"
                    id="name"
                    type="text"
                    placeholder=""
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center">
                  <label>Mô tả</label>
                  <input
                    className="border w-[350px]"
                    type="text"
                    id="description"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full justify-end px-4 py-2">
                <div
                  className="flex justify-center items-center bg-[#15a0cf] text-white px-9 py-2 hover:cursor-pointer hover:drop-shadow-md"
                  onClick={handleSubmit}
                >
                  Lưu
                </div>
                <div
                  className="flex justify-center items-center bg-[#ff213f] text-white px-6 hover:cursor-pointer hover:drop-shadow-md"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Trở về
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBrand;
