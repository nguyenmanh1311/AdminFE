import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Switch from "react-js-switch";
import { UserService } from "../../services/user.service";

const StaffDatabase = ({ rows, title, userColumns }) => {
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const onchange = (id) => {
    UserService.updateStatus(id).then();
  };

  const navigate = useNavigate();
  const enableColumn = [
    {
      field: "enable",
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
                initialValue={params.row.enable}
                onChange={() => {
                  onchange(params.row.id);
                }}
              />
            </div>
          );
        }
      },
    },
  ];
  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Xử lý",
  //     headerAlign: "center",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">
  //           <Link
  //             to={`/users/${params.row.id}`}
  //             style={{ textDecoration: "none" }}
  //           >
  //             <div className="viewButton">Xem</div>
  //           </Link>
  //           <div
  //             className="updateButton"
  //             onClick={() => handleDelete(params.row.id)}
  //           >
  //             Sửa
  //           </div>
  //           <div
  //             className="deleteButton"
  //             onClick={() => handleDelete(params.row.id)}
  //           >
  //             Xóa
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  return (
    <div className="datatable">
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>
        <div
          onClick={() => {
            navigate("/staffs/new");
          }}
          className="bg-blue-500 text-white w-[200px] rounded-md p-2 flex justify-center items-center cursor-pointer hover:drop-shadow-md transition-all duration-200"
        >
          Thêm mới
        </div>
      </div>

      <DataGrid
        className="datagrid"
        rows={rows}
        columns={userColumns.concat(enableColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
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

export default StaffDatabase;
