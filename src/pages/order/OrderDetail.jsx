import { numberWithCommas } from "~/utils";
import { CheckCircleFill } from "react-bootstrap-icons";
import { axiosInstance } from "../../api/axios.config";
import "./table.scss";
import { useState } from "react";
import { useRef } from "react";
import { OrderService } from "../../services/order.service";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = (props) => {
  const param = useParams();
  const [orderItems, setOrderItem] = useState([]);

  const style = (text) => {
    switch (text) {
      case 1:
        return "text-yellow-400 font-bold";
      case 2:
        return "text-blue-400 font-bold";
      case 3:
        return "text-green-400 font-bold";
      case 4:
        return "text-red-400 font-bold";
    }
  };

  const fetchData = () => {
    OrderService.getDetailOrderById(param.orderId).then((res) => {
      setOrderItem(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="new">
      <div className="newContainer">
        <div className="p-8 border-b">
          <div className="flex justify-center">
            <h2 className="font-bold text-3xl">Chi tiết đơn hàng:</h2>
          </div>
          <p className="text-l">
            <span className="font-bold">Trạng thái: </span>
            {orderItems.status && (
              <span className={style(orderItems.status)}>
                {orderItems.status === 1 && "Đang chờ xác nhận"}
                {orderItems.status === 2 && "Đang chuẩn bị hàng"}
                {orderItems.status === 3 && "Hoàn thành"}
                {orderItems.status === 4 && "Đã hủy"}
              </span>
            )}
          </p>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Tổng tiền</th>
            </thead>
            {orderItems?.invoice_details?.map((item) => {
              return (
                <>
                  <tbody>
                    <td>{item?.product?.name}</td>
                    <td className="flex justify-center items-center">
                      <img
                        width={"100"}
                        className="object-cover rounded-2xl"
                        src={"https://" + item.product?.product_images[0].uri}
                        alt=""
                      />
                    </td>

                    <td>{item.quantity}</td>
                    <td>{numberWithCommas(item?.product?.price)}₫</td>
                    <td>
                      {numberWithCommas(item?.product?.price * item?.quantity)}₫
                    </td>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
        <div className="text-left border-b p-4 text-l leading-[40px]">
          <p className="flex">
            <span className="font-bold">Phí vận chuyển: </span>
            <span className="text-red-500 ml-2 font-bold">
              {numberWithCommas(orderItems?.shipping_fee)}₫
            </span>
          </p>
          <p className="flex text-2xl">
            <span className="font-bold">Thành tiền: </span>
            <span className="text-red-500 ml-2 font-bold">
              {numberWithCommas(orderItems?.total)}₫
            </span>
          </p>
        </div>
        <div className="text-left p-4 text-l leading-[40px] gap-2 ">
          <div>
            <p className="font-bold text-l">
              Địa chỉ và thông tin người nhận hàng
            </p>
            <ul>
              <li>Họ và tên: {orderItems?.fullname}</li>
              <li>Số điện thoại: {orderItems?.phone_number}</li>
              <li>Địa chỉ nhận hàng: {orderItems?.address}</li>
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
    </div>
  );
};

export default OrderDetail;
