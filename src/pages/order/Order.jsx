import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllOrders } from "../../redux/order/ordersApi";
import { useDispatch } from "react-redux";
import { Table } from "flowbite-react";
import { OrderService } from "../../services/order.service";
import { numberWithCommas } from "~/utils";
import OrderDetail from "./OrderDetail";
import "./table.scss";
import clsx from "clsx";
import { useState } from "react";
import swal2 from "sweetalert2";

const Order = (props) => {
  document.title = "Đơn hàng";
  const style = (text) => {
    switch (text) {
      case "Đã đặt hàng":
      case "Đang chuẩn bị hàng":
        return "text-yellow-400 font-bold";
      case "Đang giao hàng":
        return "text-blue-400 font-bold";
      case "Đã hủy":
        return "text-red-400 font-bold";
      case "Đã xác nhận":
        return "text-green-400 font-bold";
    }
  };

  const [order, setOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState({ index: -1, id: null });

  const handleConfirm = async (e) => {
    swal2
      .fire({
        title: "Bạn có muốn xác nhận đơn hàng không?",
        showDenyButton: true,
        confirmButtonText: "Có",
        denyButtonText: "Không",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const id = e.target.id;
          const status = "Đã xác nhận";
          const data = {
            id,
            status,
          };
          const res = OrderService.updateHistoryOrder(data);

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

  // const dispatch = useDispatch();

  // const orders = useSelector((state) => state.orders.order.data);

  useEffect(() => {
    // getAllOrders(dispatch);
    async function getOrders() {
      const res = await OrderService.getAllOrder().then((res) => {
        setOrder(res.data.data);
      });
    }
    getOrders();
  }, []);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Table hoverable={true} className="">
        <Table.Head>
          <Table.HeadCell> Mã đơn hàng </Table.HeadCell>
          <Table.HeadCell>Tên khách hàng</Table.HeadCell>
          <Table.HeadCell>Tổng giá</Table.HeadCell>
          <Table.HeadCell> Ngày đặt mua</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>Tương tác</Table.HeadCell>
          <Table.HeadCell>Xử lý</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {order.map((order, index) => {
            const styleStatus = style(order.status);
            const displayDetail = index === orderDetail.index;
            const displayCancelBtn = order.status != "Đã đặt hàng";
            const styleDisable = "bg-gray-100";
            return (
              <>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
                  <Table.Cell className="text-black-400">
                    #{order.id}
                  </Table.Cell>
                  <Table.Cell className="text-black-400">
                    {order.fullName}
                  </Table.Cell>
                  <Table.Cell className="text-black-400">
                    {numberWithCommas(order.grandTotal)}₫
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <p className="">{order.createdDate}</p>{" "}
                  </Table.Cell>

                  <Table.Cell className={styleStatus}>
                    {order.status}
                  </Table.Cell>
                  <Table.Cell className="text-blue-400 hover:text-blue-700 select-none">
                    <button
                      onClick={() =>
                        setOrderDetail((current) => {
                          return current.index === index
                            ? {
                                index: -1,
                                id: order.id,
                              }
                            : {
                                index,
                                id: order.id,
                              };
                        })
                      }
                    >
                      Xem chi tiết
                    </button>
                  </Table.Cell>

                  <Table.Cell>
                    <button
                      disabled={displayCancelBtn}
                      id={order.id}
                      onClick={handleConfirm}
                      className={clsx(
                        "bg-red-500  font-medium p-2 rounded-lg text-white hover:bg-red-400",
                        displayCancelBtn && "!bg-gray-100 !text-gray-700"
                      )}
                    >
                      Xác nhận
                    </button>
                  </Table.Cell>
                </Table.Row>
                {displayDetail && (
                  <Table.Row>
                    <Table.Cell className="" colspan="7">
                      <OrderDetail {...order} />
                    </Table.Cell>
                  </Table.Row>
                )}
              </>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Order;
