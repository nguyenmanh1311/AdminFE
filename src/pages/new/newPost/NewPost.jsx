import "../new.scss";
import { useNavigate } from "react-router-dom";
import newsService from "../../../services/news.service";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import swal2 from "sweetalert2";

const NewPost = ({ inputs, title }) => {
  document.title = "Thêm phân loại mới";
  const navigate = useNavigate();
  const [arrFile, setArrFile] = useState([]);
  const [arrId, setArrId] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    const postData = () => {
      const input = {
        name: name,
        description: description,
        file_upload_ids: arrId,
      };

      newsService.createNews(input).then((res) => {
        if (res.status_code === 200) {
          swal2.fire("Thông báo", "Thêm phân loại thành công", "success");
          navigate("/categories");
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
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
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

export default NewPost;
