import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Switch from "react-js-switch";
import { UserService } from "../../services/user.service";

const StaffDatabase = ({ rows, title, userColumns }) => {
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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
  const navigate = useNavigate();
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
    <div className="datatable h-[850px] ">
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>
        <div
          onClick={() => {
            navigate("/staffs/new");
          }}
          className="bg-teal-500 text-white w-[200px] rounded-md p-2 flex justify-center items-center cursor-pointer hover:bg-teal-600 transition-all duration-200"
        >
          Thêm mới
        </div>
      </div>

      <DataGrid
        className="datagrid"
        rows={rows}
        columns={userColumns.concat(enableColumn)}
        // pageSize={9}
        // rowsPerPageOptions={[9]}
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

export default StaffDatabase;
