import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { UserService } from "../../services/user.service";
import { Link } from "react-router-dom";
import { OrderService } from "../../services/order.service";
import swal2 from "sweetalert2";
import { useState } from "react";

const OrderDatatble = ({ rows, title, orderColumns, onDataChange }) => {
  const [fullName, setFullname] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [statusOption, setStatusOption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (statusOption) {
      const data = {
        is_payment: paymentOption,
        status: Number(statusOption),
        create_at_from: startDate,
        create_at_to: endDate,
      };
      console.log("data oderdatable", data);
      onDataChange(data);
    } else {
      const data = {
        is_payment: paymentOption,
        create_at_from: startDate,
        create_at_to: endDate,
      };
      console.log("data oderdatable", data);
      onDataChange(data);
    }
  };

  const handleDelete = () => {
    setFullname("");
    setStartDate();
    setEndDate();
    setPaymentOption("");
    setStatusOption("");
  };

  const handleClickStatus = async (id, value) => {
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

  const handleClickPayment = async (id, value) => {
    if (value === false) {
      swal2
        .fire({
          title: "Bạn có muốn cập nhật trạng thái thanh toán này ?",
          showDenyButton: true,
          confirmButtonText: "Có",
          denyButtonText: "Không",
        })
        .then((result) => {
          if (result.isConfirmed) {
            const data = {
              is_payment: true,
            };
            const res = OrderService.updateStatusPayment(id, data);
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
      field: "is_payment",
      renderHeader: (params) => <strong>Trạng thái thanh toán</strong>,
      headerAlign: "center",
      align: "center",
      flex: 0.8,
      renderCell: (params) => {
        const value = params.value;
        let modifiedValue = value;

        if (value === false) {
          modifiedValue = "Chưa thanh toán";
        } else if (value === true) {
          modifiedValue = "Đã thanh toán";
        }

        return (
          <div className="cellStatus">
            {value === true ? (
              <button className="completeButton">{modifiedValue}</button>
            ) : (
              <button
                className="confirmButton"
                onClick={() => handleClickPayment(params.row.id, value)}
              >
                {modifiedValue}
              </button>
            )}
          </div>
        );
      },
    },
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
                onClick={() => handleClickStatus(params.row.id, value)}
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

      flex: 0.7,
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
              {params.row.status === 1 && (
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
    <div className="datatable overflow-hidden h-[850px]">
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
              <div className="sm:col-span-1 sm:col-start-1">
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
                    onChange={(e) => {
                      setFullname(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="payment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Trạng thái thanh toán
                </label>
                <div className="mt-2">
                  <select
                    id="payment"
                    name="payment"
                    autoComplete="payment"
                    value={paymentOption}
                    onChange={(e) => setPaymentOption(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">--Các lựa chọn--</option>
                    <option value={true}>Đã thanh toán</option>
                    <option value={false}>Chưa thanh toán</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="order-status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Trạng thái đơn hàng
                </label>
                <div className="mt-2">
                  <select
                    id="order-status"
                    name="order-status"
                    autoComplete="order-status"
                    value={statusOption}
                    onChange={(e) => setStatusOption(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">---Các lựa chọn---</option>
                    <option value={1}>Đang chờ xác nhận</option>
                    <option value={2}>Đang chuẩn bị hàng</option>
                    <option value={3}>Đã hoàn thành</option>
                    <option value={4}>Đã hủy</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="form"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Từ ngày
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
                  Đến ngày
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
              <div className="ml-10 sm:col-span-1 flex items-end">
                <div className="flex  justify-center gap-x-6 ">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="rounded-md bg-teal-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 "
                  >
                    Lọc
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 "
                    onClick={handleDelete}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={orderColumns.concat(actionColumn)}
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
