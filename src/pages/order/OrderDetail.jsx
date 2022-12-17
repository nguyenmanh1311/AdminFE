import { numberWithCommas } from "~/utils";
import { CheckCircleFill } from "react-bootstrap-icons";
import { axiosInstance } from "../../api/axios.config";
import "./table.scss";
import { useState } from "react";
import { useRef } from "react";
import { UserService } from "../../services/user.service";
import { OrderService } from "../../services/order.service";
import { useEffect } from "react";

//Trả order, ordeerr detail
function OrderDetail(props) {
  //userId, addressId, id

  const [orderItems, setOrderItem] = useState([]);

  const shipId = useRef();
  const amountPaid = props.totalPrice;
  const surcharge = 0;
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

  const fetchData = () => {
    OrderService.getAllOrderDetailByOrderId(props.id).then((res) => {
      setOrderItem(res.data.data);
    });
  };

  useEffect(() => {
    async function getAllOrder() {
      await OrderService.getAllOrder().then((res) => {
        setOrderItem(res.data.data);
      });
    }
    getAllOrder();
    fetchData();
  }, []);

  return (
    <div>
      <div className="p-8 border-b">
        <div className="flex justify-between">
          <h2 className="font-bold text-l">Chi tiết đơn hàng: #{props.id}</h2>
          <p className="text-l">
            <span className="font-bold">Trạng thái: </span>
            <span className={style(props.status)}>{props.status}</span>
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Tổng tiền</th>
          </thead>
          {orderItems.map((item) => {
            return (
              <>
                <tbody>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td className="flex justify-center items-center">
                    <img
                      width={"30"}
                      className="object-cover rounded-2xl"
                      src={
                        "http://localhost:8080/api/v1/image_product/" +
                        item.productImage
                      }
                      alt=""
                    />
                  </td>

                  <td>{item.quantity}</td>
                  <td>{numberWithCommas(item.price)}₫</td>
                  <td>{numberWithCommas(item.price * item.quantity)}₫</td>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
      <div className="text-left border-b p-4 text-l leading-[40px]">
        <p className="flex">
          <span className="font-bold">Tổng tiền: </span>
          <span className="text-red-500 ml-2">
            {numberWithCommas(props.grandTotal)}₫
          </span>
        </p>
      </div>
      <div className="text-left p-4 text-l leading-[40px] gap-2 ">
        <div>
          <p className="font-bold text-l">
            Địa chỉ và thông tin người nhận hàng
          </p>
          <ul>
            <li>Họ và tên: {props.address?.fullName}</li>
            <li>Số điện thoại: {props.address?.phone}</li>
            <li>
              Địa chỉ nhận hàng: {props.address?.addressLine},{" "}
              {props.address?.ward}, {props.address?.district},{" "}
              {props.address?.province}
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="flex justify-center items-center flex-wrap">
          {props.status === "Đặt hàng" && (
            <div className="flex gap-2">
              <p className="mt-1 mr-1">Chọn Shipper:</p>
              <select name="shiper" id="shiper" ref={shipId}>
                {props.listShiper.map((item) => {
                  return (
                    <option
                      key={item.id}
                      value={item.id}
                      style={{ fontSize: "24px" }}
                    >
                      {item.firstName} {item.lastName}
                    </option>
                  );
                })}
              </select>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  if (window.confirm("Bạn có muốn xác nhận đã giao?")) {
                    OrderService.updateShipingStatus(
                      props.id,
                      Number(shipId.current.value)
                    ).then((res) => {
                      if (res.data.statusCode === "OK") {
                        window.location.reload();
                      }
                    });
                  }
                }}
              >
                Xác nhận giao hàng
              </button>
            </div>
          )}
          {props.status === "Đang giao hàng" &&
            JSON.parse(localStorage.getItem("role")) === "Shipper" && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  if (window.confirm("Bạn có muốn xác nhận đã giao?")) {
                    OrderService.updateShipStatus(props.id).then((res) => {
                      if (res.data.statusCode === "OK") {
                        window.location.reload();
                      }
                    });
                  }
                }}
              >
                Xác nhận đã giao hàng
              </button>
            )}
        </div> */}
    </div>
  );
}

export default OrderDetail;
