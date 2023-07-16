import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "react-js-switch";
import { UserService } from "../../services/user.service";
import { useState } from "react";

const UserDatatable = ({ rows, title, userColumns, onDataChange }) => {
  const [name, setName] = useState("");
  const [statusOption, setStatusOption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (statusOption) {
      const data = {
        fullname: name,
        status: Number(statusOption),
      };
      onDataChange(data);
    } else {
      const data = {
        fullname: name,
      };
      onDataChange(data);
    }
  };

  const handleDeleteFilter = () => {
    setName("");
    setStatusOption("");
    const data = {
      fullname: null,
      status: null,
    };
    onDataChange(data);
  };

  const onchange = (id, status) => {
    const input = {
      status: 2,
    };
    if (status != 3) {
      input.status = 3;
    }
    UserService.updateStatus(id, input).then();
  };

  const enableColumn = [
    {
      field: "status",
      renderHeader: (params) => <strong>Trạng thái</strong>,
      headerAlign: "center",
      sortable: false,

      flex: 0.5,
      align: "center",
      renderCell: (params) => {
        {
          return (
            <div>
              <Switch
                initialValue={params.row.status === 2 ? true : false}
                onChange={() => {
                  onchange(params.row.id, params.row.status);
                }}
              />
            </div>
          );
        }
      },
    },
  ];
  return (
    <div className="datatable" style={{ height: "600px", overflow: "auto" }}>
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>
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
                  Họ tên khách hàng
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
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Trạng thái hoạt động
                </label>
                <div className="mt-2">
                  <select
                    id="status"
                    name="status"
                    autoComplete="status"
                    value={statusOption}
                    onChange={(e) => setStatusOption(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">---Các lựa chọn---</option>
                    <option value="2">Đang hoạt động</option>
                    <option value="3">Đã khóa</option>
                  </select>
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
                  Lọc khách hàng
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
        columns={userColumns.concat(enableColumn)}
        hideFooter={true}
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

export default UserDatatable;
