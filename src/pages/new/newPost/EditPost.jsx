import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { PostService } from "../../../services/post.service";
import imageService from "../../../services/image.service";
import { useNavigate, useParams } from "react-router-dom";
import newsService from "../../../services/news.service";
import swal2 from "sweetalert2";

const EditPost = () => {
  document.title = "Chi tiết bài viết";
  const navigate = useNavigate();
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [arrFile, setArrFile] = useState([]);
  const [arrId, setArrId] = useState([]);
  const handleEditorChange = (content) => {
    setEditorContent(content);
  };
  const [images, setImages] = useState([]);
  useEffect(() => {
    (async function () {
      const response = await newsService.getNewsById(postId);
      if (response.status_code === 200) {
        setTitle(response.data.title);
        setEditorContent(response.data.content);
        setArrId((prev) => {
          return response.data.post_images.map((value) => value.file_upload_id);
        });
        setImages((prev) => {
          return response.data.post_images.map((value) => {
            return {
              uri: value.uri,
              file_id: value.file_upload_id,
            };
          });
        });
      }
    })();
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: title,
      content: editorContent,
      file_upload_ids: arrId,
    };
    (async function () {
      const response = await newsService.putNews(payload, postId);
      if (response.status_code === 200) {
        swal2.fire({
          title: "Lưu viết thành công!",
        });
        navigate(-1);
      }
    })();
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit} style={styles.form}>
        <h2 style={styles.formTitle}>Thêm phân loại mới</h2>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Tiêu đề:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.formInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Nội dung:</label>
          <div style={styles.editor}>
            <ReactQuill value={editorContent} onChange={handleEditorChange} />
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
              className="h-[120px] w-[120px] object-cover rounded-xl"
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
          {images.map((item, index) => (
            <img
              className="h-[120px] w-[120px] object-cover rounded-xl"
              key={index}
              src={"https://" + item.uri}
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
                        return prev.filter((e, i) => e !== item.file_id);
                      });
                      setImages((currentFile) => {
                        return currentFile.filter((e) => e.uri !== item.uri);
                      });
                    } else if (result.isDenied) {
                    }
                  });
              }}
            />
          ))}
        </div>
        <div style={styles.formActions}>
          <button
            className="px-3 py-2 border-none rounded-md bg-gray-300 text-white pointer-cursor mr-2"
            onClick={() => navigate(-1)}
          >
            Hủy
          </button>
          <input style={styles.btnSubmit} type="submit" value="Lưu bài viết" />
        </div>
      </form>
    </div>
  );
};

export default EditPost;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9f9f9",
  },
  form: {
    width: "100%",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    resize: "vertical", // Allow vertical resizing
    overflow: "auto", // Add scrollbars if the content exceeds the form height
    maxHeight: "600px", // Set a maximum height for the form
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
  },
  formGroup: {
    marginBottom: "20px",
  },
  formLabel: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#333333",
  },
  formInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #cccccc",
    fontSize: "14px",
    color: "#333333",
  },
  editorContainer: {
    height: "200px", // Initial height of the editor container
    borderRadius: "4px",
    border: "1px solid #cccccc",
    fontSize: "14px",
    color: "#333333",
    marginBottom: "20px",
    overflow: "auto", // Add scrollbars if the content exceeds the container height
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "30px",
  },
  btnCancel: {
    padding: "10px 16px",
    marginRight: "10px",
    backgroundColor: "#cccccc",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px",
    cursor: "pointer",
  },
  btnSubmit: {
    padding: "10px 16px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px",
    cursor: "pointer",
  },
};
