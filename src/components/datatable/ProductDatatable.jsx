import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import swal2 from "sweetalert2";
import { useDataContext } from "../../context/DataProvider";

const ProductDatatable = ({ rows, title, productColumns }) => {
  const navigate = useNavigate();

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
            <Link
              to={`/products/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Xem</div>
            </Link>

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
    <div className="datatable overflow-hidden h-[950px]">
      <div className="flex justify-between mb-3">
        <div className="font-semibold text-[24px]">Quản lý {title}</div>
        <div
          onClick={() => {
            navigate("/products/new");
          }}
          className="bg-teal-500 text-white w-[200px] rounded-md p-2 flex justify-center items-center cursor-pointer hover:bg-teal-600 transition-all duration-200"
        >
          Thêm mới
        </div>
      </div>

      <DataGrid
        className="datagrid"
        rows={rows}
        columns={productColumns?.concat(actionColumn)}
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

export default ProductDatatable;
