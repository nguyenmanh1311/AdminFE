import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showModal, offModal } from "../../redux/modal/modalApi";
import productService from "../../services/product.service";
import brandService from "../../services/brand.service";
import categoryService from "../../services/category.service";
import Swal from "sweetalert2";
import { useState } from "react";

const Datatable = ({
  rows,
  title,
  columns,
  type = "",
  reply = false,
  onDataChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const idPro = useParams();
  const handleDelete = (id, repply) => {
    // setData(data.filter((item) => item.id !== id));
    // if (type === "comment") {
    //   const getCommentDel = rows.find((item) => item.id === id);
    //   if (repply === null) {
    //     //Tìm phần tử con
    //     let commentsDel = rows.filter((item) => item.creator.replyforId === id);
    //     if (commentsDel.length === 0) {
    //       removeComments(dispatch, id, idPro.commentId);
    //     } else {
    //       //khi xóa cha thì sẽ xóa các con comment
    //       for (let index = 0; index < commentsDel.length; index++) {
    //         removeComments(dispatch, commentsDel[index].id, idPro.commentId);
    //       }
    //       removeComments(dispatch, id, idPro.commentId);
    //     }
    //   } else {
    //     removeComments(dispatch, id, idPro.commentId);
    //   }
    // }
    if (type === "review") {
      removeReviews(dispatch, id, idPro.commentId);
    }

    if (type === "brands") {
      Swal.fire({
        title: "Bạn có chắc chắn xóa thương hiệu này không ?",
        showDenyButton: true,
        confirmButtonText: "Có",
        denyButtonText: "Không",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          brandService.deleteBrandByID(id).then((res) => {
            if (res.data.status_code === 200) {
              Swal.fire("Thông báo", "Xóa thành công", "success");
            }
          });
          setTimeout(() => {
            window.location.reload();
          }, 700);
        } else if (result.isDenied) {
          Swal.fire("Thông báo", "Thương hiệu chưa được xóa", "info");
        }
      });
    }

    if (type === "categories") {
      Swal.fire({
        title: "Bạn có chắc chắn xóa thương hiệu này không ?",
        showDenyButton: true,
        confirmButtonText: "Có",
        denyButtonText: "Không",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          categoryService.deleteCategoryByID(id).then((res) => {
            if (res.data.status_code === 200) {
              Swal.fire("Thông báo", "Xóa thành công", "success");
            }
          });
          setTimeout(() => {
            window.location.reload();
          }, 700);
        } else if (result.isDenied) {
          Swal.fire("Thông báo", "Thương hiệu chưa được xóa", "info");
        }
      });
    }
  };
  const handleAddPostModal = (repllyforId) => {
    showModal(dispatch, repllyforId);
  };

  const handleDeleteFilter = () => {
    setName("");
    setStartDate();
    setEndDate();
    const data = {
      keyword: null,
      create_at_from: null,
      create_at_to: null,
    };
    onDataChange(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      keyword: name,
      create_at_from: startDate,
      create_at_to: endDate,
    };
    onDataChange(data);
  };

  const actionColumn = [
    {
      field: "action",
      renderHeader: (params) => <strong>Xử lý</strong>,
      headerAlign: "center",
      flex: 0.8,
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction ">
            {type === "comment" && !reply && (
              <Link
                to={`/comments/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Xem</div>
              </Link>
            )}
            {type === "comment" && reply && (
              <button
                className=""
                onClick={() => {
                  if (params.row.creator.replyforId) {
                    handleAddPostModal(params.row.creator.replyforId);
                  } else {
                    handleAddPostModal(params.row.id);
                  }
                }}
              >
                Replly
              </button>
            )}
            {type === "brands" && (
              <Link
                to={`/brands/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Xem</div>
              </Link>
            )}
            {type === "categories" && (
              <Link
                to={`/categories/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Xem</div>
              </Link>
            )}

            <div
              className="deleteButton"
              onClick={() => {
                if (type === "comment") {
                  handleDelete(params.row.id, params.row.creator.replyforId);
                } else {
                  handleDelete(params.row.id);
                }
              }}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable" style={{ height: "650px", overflow: "auto" }}>
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>

        <div
          onClick={() => {
            navigate("/" + type + "/new");
          }}
          className="bg-teal-500 text-white w-[200px] rounded-md p-2 flex justify-center items-center cursor-pointer hover:bg-teal-600 transition-all duration-200"
        >
          Thêm mới
        </div>
      </div>
      <form>
        <div className="space-y-12 border-b border-gray-900/10 pb-12">
          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Bộ lọc
            </h2>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên {type === "brands" ? "thương hiệu" : "thể loại"}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="form"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ngày tạo từ
                </label>
                <div className="mt-2">
                  <input
                    id="form"
                    type="date"
                    value={startDate || ""}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="to"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ngày tạo đến
                </label>
                <div className="mt-2">
                  <input
                    id="to"
                    type="date"
                    value={endDate || ""}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <div className="flex  justify-center gap-x-6 ">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="rounded-md bg-teal-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 "
                >
                  Lọc sản phẩm
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 "
                  onClick={handleDeleteFilter}
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={columns?.concat(actionColumn)}
        hideFooter={true}
        sx={{
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
        }}
      />
    </div>
  );
};

export default Datatable;
