import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";

const NewsDatatable = ({ rows, title, newColumns }) => {
  const navigate = useNavigate();

  const actionColumn = [
    {
      field: "handle",
      renderHeader: () => <strong>Xử lí</strong>,
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
                  onClick={() =>
                    handleClickCancel(params.row.id, params.row.status)
                  }
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
    <div className="datatable">
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>
        <div
          onClick={() => {
            navigate("/news/new");
          }}
          className="bg-blue-500 text-white w-[200px] rounded-md p-2 flex justify-center items-center cursor-pointer hover:drop-shadow-md transition-all duration-200"
        >
          Thêm mới
        </div>
      </div>

      <DataGrid
        className="datagrid"
        rows={rows}
        columns={newColumns.concat(actionColumn)}
        // pageSize={10}
        // rowsPerPageOptions={[10]}
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

export default NewsDatatable;
