import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import swal2 from "sweetalert2";
import newsService from "../../services/news.service";
import { useState } from "react";

const NewsDatatable = ({ rows, title, newColumns, onDataChange }) => {
  const navigate = useNavigate();
  const [createdDate, setCreatedDate] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [creator, setCreator] = useState("");
  const [editor, setEditor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      creator: creator,
      editor: editor,
      created_at: createdDate,
      edited_at: editedDate,
    };
    console.log("data oderdatable", data);
    onDataChange(data);
  };

  const handleDeleteFilter = () => {
    setCreatedDate();
    setCreator("");
    setEditor("");
    const data = {
      creator: null,
      editor: null,
      edited_at: null,
      created_at: null,
    };
    console.log("data oderdatable delete", data);
    onDataChange(data);
  };

  const deleteNews = (id) => {
    swal2
      .fire({
        title: "Bạn có chắc chắn xóa bài viết này không ?",
        showDenyButton: true,
        confirmButtonText: "Có",
        denyButtonText: "Không",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          newsService.deleteNewsByID(id).then(() => {
            swal2.fire("Thông báo", "Xóa bài viết thành công", "success");
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else if (result.isDenied) {
          swal2.fire("Thông báo", "Bài viết chưa được xóa", "info");
        }
      });
  };

  const actionColumn = [
    {
      field: "handle",
      renderHeader: () => <strong>Hành động</strong>,
      headerAlign: "center",
      sortable: false,

      flex: 0.5,
      align: "center",
      renderCell: (params) => {
        {
          return (
            <div className="cellAction">
              <Link
                to={`/news/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <button className="viewButton">Xem</button>
              </Link>
              {params.row.status != 2 && (
                <div
                  className="deleteButton"
                  onClick={() => deleteNews(params.row.id)}
                >
                  Xóa
                </div>
              )}
            </div>
          );
        }
      },
    },
  ];

  return (
    <div className="datatable overflow-hidden h-[1150px]">
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>
        <div
          onClick={() => {
            navigate("/news/new");
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
              <div className="sm:col-span-1 sm:col-start-1">
                <label
                  htmlFor="creator"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên người tạo
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="creator"
                    id="creator"
                    autoComplete="creator"
                    value={creator}
                    onChange={(e) => {
                      setCreator(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="editor"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên người chỉnh sửa cuối cùng
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="editor"
                    id="editor"
                    autoComplete="editor"
                    value={editor}
                    onChange={(e) => {
                      setEditor(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="createdDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ngày tạo bài viết
                </label>
                <div className="mt-2">
                  <input
                    id="createdDate"
                    type="date"
                    value={createdDate || ""}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setCreatedDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="editedDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ngày chỉnh sửa bài viết cuối cùng
                </label>
                <div className="mt-2">
                  <input
                    id="editedDate"
                    type="date"
                    value={editedDate || ""}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setEditedDate(e.target.value)}
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
                  Lọc đơn hàng
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
        columns={newColumns.concat(actionColumn)}
        hideFooter={true}
        rowHeight={200}
        sx={{
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
            {
              outline: "none",
            },
          "& .MuiDataGrid-columnHeaders": {},
        }}
      />
    </div>
  );
};

export default NewsDatatable;
