import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { UserService } from "../../services/user.service";
import { Link } from "react-router-dom";
import { OrderService } from "../../services/order.service";
import swal2 from "sweetalert2";

const OrderDatatble = ({ rows, title, orderColumns }) => {
  const onchange = (id) => {
    UserService.updateStatus(id).then();
  };

  const handleClick = async (id, value) => {
    if (value === 1) {
      swal2
        .fire({
          title: "Bạn có muốn xác nhận đơn hàng không?",
          showDenyButton: true,
          confirmButtonText: "Có",
          denyButtonText: "Không",
        })
        .then((result) => {
          if (result.isConfirmed) {
            const data = {
              status: 2,
            };
            const res = OrderService.updateStatusOrder(id, data);
            if (res) {
              swal2
                .fire({
                  title: "Thông báo",
                  icon: "success",
                  text: "Xác nhận thành công",
                  confirmButtonText: "Đồng ý",
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
            }
          }
        });
    }
  };
  const handleClickCancel = async (id, status) => {
    if ((status === 1) | (status === 2))
      swal2
        .fire({
          title: "Bạn chắc chắn hủy đơn hàng không?",
          showDenyButton: true,
          confirmButtonText: "Có",
          denyButtonText: "Không",
        })
        .then((result) => {
          if (result.isConfirmed) {
            const data = {
              status: 4,
            };
            const res = OrderService.updateStatusOrder(id, data);
            if (res) {
              swal2
                .fire({
                  title: "Thông báo",
                  icon: "success",
                  text: "Xác nhận thành công",
                  confirmButtonText: "Đồng ý",
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
            }
          }
        });
  };

  const actionColumn = [
    {
      field: "status",
      renderHeader: () => <strong>Trạng thái đơn hàng</strong>,
      headerAlign: "center",
      flex: 0.9,
      align: "center",
      renderCell: (params) => {
        const value = params.value;
        let modifiedValue = value;

        if (value === 1) {
          modifiedValue = "Đang chờ xác nhận";
        } else if (value === 2) {
          modifiedValue = "Đang giao hàng";
        } else if (value === 3) {
          modifiedValue = "Hoàn thành";
        } else if (value === 4) {
          modifiedValue = "Đã hủy";
        }

        return (
          <div className="cellStatus">
            {modifiedValue === "Đang chờ xác nhận" && (
              <button
                className="confirmButton"
                onClick={() => handleClick(params.row.id, value)}
              >
                {modifiedValue}
              </button>
            )}
            {modifiedValue === "Đang giao hàng" && (
              <button className="prepareButton">{modifiedValue}</button>
            )}
            {modifiedValue === "Hoàn thành" && (
              <button className="completeButton">{modifiedValue}</button>
            )}
            {modifiedValue === "Đã hủy" && (
              <button className="cancelButton">{modifiedValue}</button>
            )}
          </div>
        );
      },
    },
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
                to={`/orders/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <button className="viewButton">Xem</button>
              </Link>
              {params.row.status != 4 && (
                <div
                  className="deleteButton"
                  onClick={() =>
                    handleClickCancel(params.row.id, params.row.status)
                  }
                >
                  Hủy đơn
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
      </div>

      <DataGrid
        className="datagrid"
        rows={rows}
        columns={orderColumns.concat(actionColumn)}
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

export default OrderDatatble;
